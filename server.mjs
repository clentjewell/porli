// Node.js adapter: local SQLite database, static files from ./public and
// uploaded images in ./public/uploads. The application logic lives in lib/porli.mjs.
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, resolve, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import { createPorli, mimeTypes, cacheControl, extname } from './lib/porli.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const publicRoot = join(root, 'public');
const uploadsRoot = join(publicRoot, 'uploads');

export function createApp({
  dbPath = process.env.PORLI_DB || join(root, 'var/porli.sqlite'),
  demo = process.env.PORLI_DEMO !== '0',
  seed = process.env.PORLI_SEED ? process.env.PORLI_SEED !== '0' : demo,
  adminEmail = process.env.PORLI_ADMIN_EMAIL || '',
  adminPassword = process.env.PORLI_ADMIN_PASSWORD || ''
} = {}) {
  if (dbPath !== ':memory:') mkdirSync(dirname(resolve(dbPath)), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
  const storage = {
    one: (sql, ...args) => db.prepare(sql).get(...args),
    all: (sql, ...args) => db.prepare(sql).all(...args),
    run: (sql, ...args) => db.prepare(sql).run(...args),
    exec: sql => db.exec(sql),
    transaction: fn => { db.exec('BEGIN IMMEDIATE'); try { const result = fn(); db.exec('COMMIT'); return result; } catch (e) { db.exec('ROLLBACK'); throw e; } }
  };
  const files = {
    exists: async url => existsSync(join(publicRoot, url)),
    read: async name => { const file = join(uploadsRoot, name); return existsSync(file) ? readFileSync(file) : null; },
    write: async (name, bytes) => { mkdirSync(uploadsRoot, { recursive: true }); writeFileSync(join(uploadsRoot, name), bytes); }
  };
  const porli = createPorli({
    db: storage, files,
    schema: readFileSync(join(root, 'migrations/001.sql'), 'utf8'),
    fixture: JSON.parse(readFileSync(join(root, 'data/demo-properties.json'), 'utf8')),
    demo, seed, adminEmail, adminPassword
  });
  const notFound = () => new Response(JSON.stringify({ error: 'Not found.' }), { status: 404, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  async function serveStatic(request) {
    const url = new URL(request.url);
    const rel = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1);
    let file = resolve(publicRoot, rel);
    if (!file.startsWith(publicRoot + sep)) return notFound();
    if (!statSync(file, { throwIfNoEntry: false })?.isFile()) { if (extname(rel)) return notFound(); file = join(publicRoot, 'index.html'); }
    const body = request.method === 'HEAD' ? null : readFileSync(file);
    const type = mimeTypes[extname(file)] || 'application/octet-stream';
    return new Response(body, { status: 200, headers: { 'Content-Type': type, 'Cache-Control': cacheControl(url.pathname, type) } });
  }
  const server = http.createServer(async (req, res) => {
    let response;
    try {
      const request = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: ['GET', 'HEAD'].includes(req.method) ? undefined : Readable.toWeb(req),
        duplex: 'half'
      });
      response = await porli.handle(request, { remoteAddress: req.socket.remoteAddress, secure: !!req.socket.encrypted, serveStatic });
    } catch {
      response = new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const headers = {};
    for (const [key, value] of response.headers) if (key !== 'set-cookie') headers[key] = value;
    const cookies = response.headers.getSetCookie();
    if (cookies.length) headers['set-cookie'] = cookies;
    const body = Buffer.from(await response.arrayBuffer());
    res.writeHead(response.status, headers);
    res.end(req.method === 'HEAD' ? undefined : body);
  });
  return { server, db };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const host = process.env.HOST || '127.0.0.1';
  if (process.env.PORLI_DEMO !== '0' && !['127.0.0.1', 'localhost', '::1'].includes(host)) throw new Error('Demo mode must bind to loopback only.');
  const { server } = createApp();
  server.listen(Number(process.env.PORT) || 4173, host, () => console.log(`Porli is ready at http://${host}:${server.address().port}`));
}
