// Cloudflare adapter. The Worker serves ./public as static assets at the edge and
// forwards /api/* and /uploads/* to a single SQLite-backed Durable Object that
// runs the application core (lib/porli.mjs) with the same synchronous SQL model
// as the local Node.js server.
import { DurableObject } from 'cloudflare:workers';
import { createPorli, securityHeaders, cacheControl, extname, isLoopbackHost } from '../lib/porli.mjs';
import schema from '../migrations/001.sql';
import fixture from '../data/demo-properties.json';

const MAX_BODY = 8_000_000; // Matches the application core's request limit.
const CHUNK = 1_000_000; // Durable Object rows are limited to 2 MB; uploads are stored in 1 MB chunks.
const json = (status, data) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const demoEnabled = env => env.PORLI_DEMO === '1';

export class PorliDatabase extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    const sql = ctx.storage.sql;
    try { sql.exec('PRAGMA foreign_keys = ON'); } catch (e) { console.error('foreign_keys pragma unavailable', e); }
    sql.exec('CREATE TABLE IF NOT EXISTS uploads (name TEXT NOT NULL, idx INTEGER NOT NULL, data BLOB NOT NULL, PRIMARY KEY(name, idx))');
    const db = {
      one: (query, ...args) => sql.exec(query, ...args).toArray()[0],
      all: (query, ...args) => sql.exec(query, ...args).toArray(),
      run: (query, ...args) => { sql.exec(query, ...args); },
      exec: text => { for (const statement of text.split('\n').map(s => s.trim()).filter(s => s && !/^PRAGMA/i.test(s))) sql.exec(statement); },
      transaction: fn => ctx.storage.transactionSync(fn)
    };
    const files = {
      exists: async url => {
        if (url.startsWith('/uploads/')) return !!db.one('SELECT 1 AS present FROM uploads WHERE name=? AND idx=0', url.slice('/uploads/'.length));
        const response = await env.ASSETS.fetch(new Request('https://assets.local' + url, { method: 'HEAD' }));
        return response.ok;
      },
      read: async name => {
        const rows = db.all('SELECT data FROM uploads WHERE name=? ORDER BY idx', name);
        if (!rows.length) return null;
        const size = rows.reduce((n, r) => n + r.data.byteLength, 0);
        const out = new Uint8Array(size); let offset = 0;
        for (const r of rows) { out.set(new Uint8Array(r.data), offset); offset += r.data.byteLength; }
        return out;
      },
      write: async (name, bytes) => {
        db.transaction(() => {
          for (let idx = 0, offset = 0; offset < bytes.byteLength || idx === 0; idx++, offset += CHUNK) {
            const chunk = bytes.subarray(offset, offset + CHUNK);
            db.run('INSERT INTO uploads VALUES(?,?,?)', name, idx, chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength));
          }
        });
      }
    };
    this.porli = createPorli({
      db, files, schema, fixture,
      demo: demoEnabled(env),
      seed: env.PORLI_SEED !== '0',
      adminEmail: env.PORLI_ADMIN_EMAIL || '',
      adminPassword: env.PORLI_ADMIN_PASSWORD || '',
      mapsEmbedKey: env.PORLI_MAPS_EMBED_KEY || ''
    });
  }
  fetch(request) {
    return this.porli.handle(request, {
      remoteAddress: request.headers.get('cf-connecting-ip') || '',
      secure: new URL(request.url).protocol === 'https:'
    });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (demoEnabled(env) && !isLoopbackHost(url.hostname)) return json(403, { error: 'Local demo host required.' });
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) {
      // Demo mode only: tests may point requests at an isolated database.
      const name = (demoEnabled(env) && request.headers.get('x-porli-database')) || 'porli';
      let forwarded = request;
      if (!['GET', 'HEAD'].includes(request.method)) {
        // Buffer the body before handing it to the Durable Object. Streaming it would fail
        // with an uncaught error whenever the object rejects a request before reading it.
        if (Number(request.headers.get('content-length') || 0) > MAX_BODY) return json(413, { error: 'File is too large. Maximum upload is 5 MB.' });
        const body = await request.arrayBuffer();
        if (body.byteLength > MAX_BODY) return json(413, { error: 'File is too large. Maximum upload is 5 MB.' });
        forwarded = new Request(request, { body });
      }
      return env.PORLI_DB.get(env.PORLI_DB.idFromName(name)).fetch(forwarded);
    }
    let response;
    if (!['GET', 'HEAD'].includes(request.method)) response = json(405, { error: 'Method not allowed.' });
    else {
      response = await env.ASSETS.fetch(request);
      if (response.status === 404) {
        if (extname(url.pathname)) response = json(404, { error: 'Not found.' });
        else response = await env.ASSETS.fetch(new Request(new URL('/index.html', url), { method: request.method }));
      }
    }
    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(securityHeaders)) headers.set(key, value);
    if (response.ok) headers.set('Cache-Control', cacheControl(url.pathname, headers.get('content-type') || ''));
    return new Response(response.body, { status: response.status, headers });
  }
};
