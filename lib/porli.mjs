// Porli application core. Runtime-neutral: works on Node.js (server.mjs) and
// inside a Cloudflare Durable Object (worker/index.mjs). It receives a standard
// Request, talks to storage through the small `db` and `files` adapters passed
// in, and returns a standard Response.
import { randomUUID, randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';

const now = () => new Date().toISOString();
const uid = () => randomUUID();
const hashToken = t => createHash('sha256').update(t).digest('hex');
export function passwordHash(password, salt = randomBytes(16).toString('hex')) { return salt + ':' + scryptSync(password, salt, 64).toString('hex'); }
function passwordMatches(password, stored) { const parts = stored.split(':'); return parts.length === 2 && timingSafeEqual(Buffer.from(passwordHash(password, parts[0])), Buffer.from(stored)); }
function fail(status, message) { throw Object.assign(new Error(message), { status }); }
const text = (v, max = 5000) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const staff = u => u && ['staff', 'admin'].includes(u.role);
const publicUser = u => u ? { id: u.id, name: u.name, email: u.email, role: u.role } : null;
const TRANSACTION_STATUSES = ['available','under_offer','sold','withdrawn'];
const PROPERTY_TYPES = { residential: ['house','apartment','townhouse','villa','land'], commercial: ['office','retail','industrial','hotel','medical','showroom','development_land','rural','other'] };
const SALE_METHODS = ['private_sale','expressions_of_interest','auction','tender','price_on_application'];
const TENANCIES = ['','vacant','leased','owner_occupied'];
const SORTS = ['featured','newest','price-asc','price-desc'];
// The headline listing's "Why" copy and grouped features. Kept here so the seed (fresh
// database) and the idempotent migration below (existing database) write identical text.
// Every claim is drawn from the property's own published information at grandbluethailand.com;
// nothing here states a price, a room count or an area, all of which are still to be confirmed.
const GRAND_BLUE_WHY = [
  'GrandBlue is a trading oceanfront hotel rather than a development site. It sits directly on Mae Phim Beach, a 4.3 km stretch of sand on Thailand’s eastern seaboard, about two hours by road from Suvarnabhumi International Airport and about two and a half from Bangkok. Pattaya is 100 km away, Rayong city 45 km, and Koh Samet a short boat trip offshore.',
  'The resort already operates as a full-service business: De Luxe rooms, two-bedroom family rooms and a top-floor penthouse suite, an oversized swimming pool and a children’s pool, a restaurant, bar and wine shop, a beachclub lounge, a conference centre, and a massage and fitness centre with a Finnish sauna. It runs as a green resort, with a solar panel system and an advanced water treatment system installed.',
  'Pricing, room count, land and floor area and sale terms are to be confirmed with the Porli team.'
].join('\n\n');
const GRAND_BLUE_FEATURE_GROUPS = [
  ['Outdoor', ['Oversized swimming pool', "Children's pool with waterfall and water slide", 'Beachclub lounge', 'Large balconies facing the pool']],
  ['Indoor', ['Restaurant and bar', 'Wine shop', 'Conference centre', 'Massage and fitness centre with Finnish sauna', 'Tour desk']],
  ['Sustainability', ['Solar panel system', 'Water treatment system']]
];
const uploadName = /^[a-zA-Z0-9_.-]+\.(webp|png|jpg)$/;

export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; connect-src 'self'; font-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
};
export const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
export function extname(pathname) { const base = pathname.slice(pathname.lastIndexOf('/') + 1); const dot = base.lastIndexOf('.'); return dot > 0 ? base.slice(dot) : ''; }
export const cacheControl = (pathname, contentType = '') => pathname.startsWith('/uploads/') ? 'private, no-store' : ['.html', '.js', '.css'].includes(extname(pathname)) || /^text\/(html|css|javascript)/.test(contentType) ? 'no-cache' : 'public, max-age=3600';
export const isLoopbackHost = hostname => ['127.0.0.1', 'localhost', '[::1]', '::1'].includes(hostname);
const isLoopbackAddress = address => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address);
export function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(securityHeaders)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
const json = (status, data, headers = {}) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks = []; let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8_000_000) { await reader.cancel().catch(() => {}); fail(413, 'File is too large. Maximum upload is 5 MB.'); }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks.map(c => Buffer.from(c.buffer, c.byteOffset, c.byteLength))));
}

/**
 * @param {object} options
 * @param {{one:Function, all:Function, run:Function, exec:Function, transaction:Function}} options.db synchronous SQL adapter
 * @param {{exists:Function, read:Function, write:Function}} options.files image storage adapter (async)
 * @param {string} options.schema SQL migration text
 * @param {{properties:Array}} options.fixture fictional demo listings
 * @param {boolean} options.demo loopback-only demo accounts and sign-in shortcuts
 * @param {boolean} options.seed insert the fictional listings into an empty database
 * @param {string} options.adminEmail bootstrap administrator account (optional)
 * @param {string} options.adminPassword bootstrap administrator password (optional)
 * @param {string} options.mapsEmbedKey Google Maps Embed API browser key, restricted by HTTP referrer (optional; keyless embed used when absent)
 */
export function createPorli({ db, files, schema, fixture, demo = false, seed = demo, adminEmail = '', adminPassword = '', mapsEmbedKey = '' }) {
  const { one, all, run, exec, transaction } = db;
  exec(schema);
  // Added idempotently: the schema uses CREATE TABLE IF NOT EXISTS, so an existing
  // database needs these columns added on top. Each ALTER runs on its own so one
  // already-present column does not stop the rest from being added.
  for (const column of [
    "ALTER TABLE properties ADD COLUMN price_label TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN currency TEXT NOT NULL DEFAULT 'AUD'",
    'ALTER TABLE properties ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 1',
    "ALTER TABLE properties ADD COLUMN details TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE properties ADD COLUMN highlights TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE properties ADD COLUMN listed_at TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN sector TEXT NOT NULL DEFAULT 'residential'",
    "ALTER TABLE properties ADD COLUMN sale_method TEXT NOT NULL DEFAULT 'private_sale'",
    'ALTER TABLE properties ADD COLUMN floor_area INTEGER NOT NULL DEFAULT 0',
    'ALTER TABLE properties ADD COLUMN land_area INTEGER NOT NULL DEFAULT 0',
    "ALTER TABLE properties ADD COLUMN zoning TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN tenancy TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN address TEXT NOT NULL DEFAULT ''",
    'ALTER TABLE properties ADD COLUMN latitude REAL NOT NULL DEFAULT 0',
    'ALTER TABLE properties ADD COLUMN longitude REAL NOT NULL DEFAULT 0',
    "ALTER TABLE properties ADD COLUMN directions TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN why TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE properties ADD COLUMN feature_groups TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE properties ADD COLUMN documents TEXT NOT NULL DEFAULT '[]'"
  ]) { try { run(column); } catch {} }
  // Renting is retired. These two migrations are idempotent and run on every start (before
  // seeding) so a database created by older code ends up identical in shape to a fresh one.
  run("UPDATE properties SET mode='buy', available_date='', transaction_status=CASE transaction_status WHEN 'leased' THEN 'sold' WHEN 'application_pending' THEN 'under_offer' ELSE transaction_status END, price_minor=CASE id WHEN 'demo-property-02' THEN 64500000 WHEN 'demo-property-04' THEN 118000000 WHEN 'demo-property-05' THEN 39500000 WHEN 'demo-property-08' THEN 58500000 ELSE 0 END, price_label=CASE WHEN id IN ('demo-property-02','demo-property-04','demo-property-05','demo-property-08') THEN price_label ELSE 'Price to be confirmed' END WHERE mode='rent'");
  run("UPDATE properties SET sector='commercial', sale_method='expressions_of_interest' WHERE property_type='hotel' AND sector='residential'");
  // Geocode the hotel once: idempotent (guarded by latitude=0) so it also migrates a database
  // created before this column existed, without overwriting a value a staff member later edits.
  run("UPDATE properties SET address=?, latitude=?, longitude=?, directions=? WHERE id='grand-blue-hotel' AND latitude=0",
    'Laem Mae Phim Beach Road, 180 Moo 4, Tambon Kram, Amphur Klaeng, Rayong 21190, Thailand', 12.6523552, 101.6108262,
    'By road, the resort is about two hours from Suvarnabhumi Airport (170 km) and about two and a half hours from Bangkok city (190 km). Pattaya is 100 km away (about 1.2 hours) and Rayong city 45 km (about 30 minutes). Koh Samet is a short boat trip away.');
  // Backfill the headline listing's "Why" copy and grouped features once. Guarded by why=''
  // so a database created before these columns existed migrates on its next start, and so a
  // staff member's later edit is never overwritten.
  run("UPDATE properties SET why=?, feature_groups=? WHERE id='grand-blue-hotel' AND why=''", GRAND_BLUE_WHY, JSON.stringify(GRAND_BLUE_FEATURE_GROUPS));
  const audit = (u, action, subject, details = {}) => run('INSERT INTO audit VALUES(?,?,?,?,?,?)', uid(), u.id, action, subject, JSON.stringify(details), now());
  const property = p => { if (!p) return null; const { mode, ...rest } = p; return { ...rest, media: JSON.parse(p.media), features: JSON.parse(p.features), details: JSON.parse(p.details), highlights: JSON.parse(p.highlights), feature_groups: JSON.parse(p.feature_groups || '[]'), documents: JSON.parse(p.documents || '[]'), is_demo: !!p.is_demo, address_display: p.address ? 'full' : 'locality_only', has_location: p.latitude !== 0 || p.longitude !== 0 }; };
  if (seed && !one('SELECT id FROM properties LIMIT 1')) {
    const images = ['courtyard','apartment','townhouse','veranda','apartment','townhouse','veranda','apartment'];
    const summaries = ['A quiet courtyard, open doors and room to slow down.','Soft morning light and a little green space of your own.','Warm brick, a private entrance and everyday practicality.','Space for the family, from the garden to the veranda.'];
    fixture.properties.forEach((p, i) => { const createdAt = now(); run('INSERT INTO properties(id,slug,title,mode,property_type,price_minor,bedrooms,bathrooms,parking,locality,summary,description,publication_state,transaction_status,media,features,featured,created_at,listed_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', p.id,p.slug,p.title,p.mode,p.property_type,p.price_minor,p.bedrooms,p.bathrooms,p.parking,p.locality.replace(' (fictional)',''),summaries[i % 4], `${summaries[i % 4]} ${i === 0 ? 'Limewashed brick and timber frame an open courtyard. A shaded veranda connects the living spaces with the garden, while broad doorways bring light through the house.' : i === 1 ? 'The living room opens onto a planted balcony. Pale walls, oak shelving and considered proportions make a compact home feel comfortable.' : i === 3 ? 'A covered outdoor room looks onto an established garden. The single-storey layout keeps living spaces connected, with room for quiet corners.' : 'A considered home with natural materials and practical living spaces.'} This is a fictional listing with generated concept imagery.`,p.publication_state,p.transaction_status,JSON.stringify([{url:`/assets/${images[i]}.webp`,alt:`${p.title} — fictional architectural study`}]),JSON.stringify(i === 0 ? ['Private courtyard','Covered veranda','Timber finishes','Established planting'] : ['Natural light','Outdoor space','Practical layout']),i === 0 ? 1 : 0,createdAt,createdAt); });
    for (const p of fixture.properties.filter(p => p.transaction_status === 'available' && p.publication_state === 'published')) {
      for (let day = 2; day <= 4; day += 2) { const date = new Date(); date.setUTCDate(date.getUTCDate()+day); date.setUTCHours(0,30,0,0); run('INSERT INTO slots(id,property_id,starts_at,capacity) VALUES(?,?,?,?)',uid(),p.id,date.toISOString(),4); }
    }
  }
  // The Grand Blue Hotel headline listing: inserted (INSERT OR IGNORE) whenever the row is
  // absent, even on a database that already has the fictional homes, so this also runs once
  // against a pre-existing database. Courtyard House is demoted to a single featured listing.
  if (seed && !one("SELECT id FROM properties WHERE id='grand-blue-hotel'")) {
    const createdAt = now();
    const description = [
      'GrandBlue Resort & Beachclub is a full-service oceanfront hotel on Mae Phim Beach, on the eastern coast of Thailand, around two hours by car from Bangkok and Suvarnabhumi International Airport. The property describes itself as a place to slow down and unwind, with a laid-back lifestyle in an elegant setting and a modern Mediterranean design theme.',
      "Accommodation includes De Luxe rooms, two-bedroom family rooms for up to four guests, and a top-floor penthouse suite with a living room and a terrace with a jacuzzi and panoramic sea views. Rooms are spacious, with large balconies facing the pool area.",
      "Facilities include an oversized swimming pool, a children's pool with a waterfall and water slide, a restaurant and bar, a wine shop, a beachclub lounge, a conference centre, a massage and fitness centre with a Finnish sauna and gym, and a tour desk. The resort operates as a green resort, with a solar panel system and an advanced water treatment system.",
      'Mae Phim Beach is 4.3 km long. Koh Samet is a short boat trip away; Rayong city is 45 km, Pattaya 100 km and Suvarnabhumi Airport 170 km by road.',
      'Pricing, room count, land area and sale terms are to be confirmed with the Porli team. The figures above are drawn from the property’s own published information.'
    ].join('\n\n');
    const media = [
      { url: '/assets/grand-blue-aerial.webp', alt: 'GrandBlue Resort & Beachclub: aerial view of the hotel building and swimming pool beside Mae Phim Beach' },
      { url: '/assets/grand-blue-pool.webp', alt: 'GrandBlue Resort & Beachclub: the main pool and sun loungers in front of the hotel' },
      { url: '/assets/grand-blue-beach.webp', alt: 'Mae Phim Beach in front of the resort, with white sand and shade trees' },
      { url: '/assets/grand-blue-room.webp', alt: 'A guest room at GrandBlue Resort & Beachclub with a balcony overlooking the pool' },
      { url: '/assets/grand-blue-sunset.webp', alt: 'Sunset over Mae Phim Beach beside the resort' },
      { url: '/assets/grand-blue-evening.webp', alt: 'Evening dining beside the pool at GrandBlue Resort & Beachclub' }
    ];
    const highlights = ['Oceanfront on Mae Phim Beach','About two hours from Bangkok','Oversized pool and beachclub','Restaurant, bar and conference centre','Solar power and water treatment','Price to be confirmed'];
    const details = [
      ['Beach','Mae Phim Beach, 4.3 km'],
      ['Airport','170 km, about 2 hours'],
      ['Bangkok','190 km, about 2.5 hours'],
      ['Property','Full-service oceanfront hotel and beachclub'],
      ['Address','Laem Mae Phim Beach Road, Rayong 21190, Thailand'],
      ['Rooms','De Luxe, family and penthouse suite; count to be confirmed'],
      ['Land and floor area','To be confirmed'],
      ['Pattaya','100 km, about 1.2 hours by car'],
      ['Rayong city','45 km, about 30 minutes by car'],
      ['Koh Samet','A short boat trip'],
      ['Price','To be confirmed']
    ];
    const features = ["Oversized swimming pool","Children's pool with waterfall and water slide",'Restaurant and bar','Wine shop','Beachclub lounge','Conference centre','Massage and fitness centre with Finnish sauna','Tour desk','Large balconies facing the pool','Solar panel system','Water treatment system'];
    const hotelCols = ['id','slug','title','mode','property_type','price_minor','price_label','currency','is_demo','bedrooms','bathrooms','parking','locality','summary','description','publication_state','transaction_status','media','features','details','highlights','featured','created_at','listed_at','sector','sale_method','address','latitude','longitude','directions','why','feature_groups'];
    run(`INSERT OR IGNORE INTO properties(${hotelCols.join(',')}) VALUES(${hotelCols.map(()=>'?').join(',')})`,
      'grand-blue-hotel','grand-blue-hotel-thailand','GrandBlue Resort & Beachclub','buy','hotel',0,'Price to be confirmed','THB',0,0,0,0,
      'Mae Phim Beach, Rayong, Thailand','A full-service oceanfront hotel and beachclub on Mae Phim Beach, about two hours from Bangkok.',description,
      'published','available',JSON.stringify(media),JSON.stringify(features),JSON.stringify(details),JSON.stringify(highlights),1,createdAt,createdAt,'commercial','expressions_of_interest',
      'Laem Mae Phim Beach Road, 180 Moo 4, Tambon Kram, Amphur Klaeng, Rayong 21190, Thailand',12.6523552,101.6108262,
      'By road, the resort is about two hours from Suvarnabhumi Airport (170 km) and about two and a half hours from Bangkok city (190 km). Pattaya is 100 km away (about 1.2 hours) and Rayong city 45 km (about 30 minutes). Koh Samet is a short boat trip away.',
      GRAND_BLUE_WHY, JSON.stringify(GRAND_BLUE_FEATURE_GROUPS));
    run("UPDATE properties SET featured=0 WHERE id='demo-property-01'");
    for (let day = 3; day <= 6; day += 3) { const date = new Date(); date.setUTCDate(date.getUTCDate()+day); date.setUTCHours(2,0,0,0); run('INSERT INTO slots(id,property_id,starts_at,capacity) VALUES(?,?,?,?)',uid(),'grand-blue-hotel',date.toISOString(),4); }
  }
  // Two fictional commercial listings, kept in code (like the hotel) rather than the JSON
  // fixture: their field set (highlights, details, features, floor/land area, zoning, tenancy)
  // is fully specified and does not need to flow through the generic residential fixture path.
  // INSERT OR IGNORE so an existing database also receives them on its next start.
  if (seed) {
    const commercialFixtures = [
      { id:'demo-commercial-01', slug:'highstreet-offices', title:'Highstreet Offices', property_type:'office',
        price_minor:185000000, price_label:'', sale_method:'private_sale', locality:'Elmshore',
        floor_area:420, land_area:610, zoning:'Mixed use (fictional)', tenancy:'vacant', parking:6, bedrooms:0, bathrooms:2,
        summary:'A three-storey office building on a quiet high street, offered with vacant possession.',
        description:'Highstreet Offices is a three-storey commercial building with a glazed ground-floor tenancy and two upper floors of open-plan office space. Pale brick and painted timber give the street frontage a settled, residential scale.\n\nOffered with vacant possession. Six car spaces at the rear. This is a fictional listing with generated concept imagery.',
        highlights:['Vacant possession','Ground-floor shopfront','Six rear car spaces'],
        details:[['Floor area','420 m²'],['Land area','610 m²'],['Zoning','Mixed use (fictional)'],['Tenancy','Vacant possession'],['Car spaces','6']],
        features:['Glazed ground-floor tenancy','Two open-plan office floors','Rear car parking','Street-level entry'],
        media:[{ url:'/assets/highstreet-offices.webp', alt:'Highstreet Offices — fictional three-storey office building with a glazed shopfront' }] },
      { id:'demo-commercial-02', slug:'millrace-warehouse', title:'Millrace Warehouse', property_type:'industrial',
        price_minor:0, price_label:'Contact the team', sale_method:'expressions_of_interest', locality:'Fernwick',
        floor_area:1150, land_area:2400, zoning:'General industrial (fictional)', tenancy:'leased', parking:12, bedrooms:0, bathrooms:1,
        summary:'A modern warehouse unit with office frontage, offered as a leased investment.',
        description:'Millrace Warehouse is a clean-lined concrete tilt-panel warehouse with a roller door, a glazed office entry and a sealed hardstand to the front. The unit sits on a small business estate with native planting to the street.\n\nOffered as a leased investment by expressions of interest. This is a fictional listing with generated concept imagery.',
        highlights:['Leased investment','Roller door and hardstand','Office frontage'],
        details:[['Floor area','1,150 m²'],['Land area','2,400 m²'],['Zoning','General industrial (fictional)'],['Tenancy','Leased investment'],['Car spaces','12']],
        features:['Concrete tilt-panel construction','Roller door access','Glazed office entry','Sealed hardstand'],
        media:[{ url:'/assets/millrace-warehouse.webp', alt:'Millrace Warehouse — fictional tilt-panel warehouse unit with office entry' }] }
    ];
    const commercialCols = ['id','slug','title','mode','sector','property_type','price_minor','price_label','sale_method','currency','is_demo','bedrooms','bathrooms','parking','locality','summary','description','publication_state','transaction_status','media','features','details','highlights','floor_area','land_area','zoning','tenancy','featured','created_at','listed_at'];
    for (const f of commercialFixtures) {
      if (!one('SELECT id FROM properties WHERE id=?', f.id)) {
        const createdAt = now();
        run(`INSERT OR IGNORE INTO properties(${commercialCols.join(',')}) VALUES(${commercialCols.map(()=>'?').join(',')})`,
          f.id, f.slug, f.title, 'buy', 'commercial', f.property_type, f.price_minor, f.price_label, f.sale_method, 'AUD', 1,
          f.bedrooms, f.bathrooms, f.parking, f.locality, f.summary, f.description, 'published', 'available',
          JSON.stringify(f.media), JSON.stringify(f.features), JSON.stringify(f.details), JSON.stringify(f.highlights),
          f.floor_area, f.land_area, f.zoning, f.tenancy, 0, createdAt, createdAt);
        for (let day = 2; day <= 4; day += 2) { const date = new Date(); date.setUTCDate(date.getUTCDate()+day); date.setUTCHours(1,0,0,0); run('INSERT INTO slots(id,property_id,starts_at,capacity) VALUES(?,?,?,?)',uid(),f.id,date.toISOString(),4); }
      }
    }
  }
  if (demo) for (const [id,name,role] of [['demo-customer','Alex Morgan','customer'],['demo-other','Jamie Ellis','customer'],['demo-staff','Sam Taylor','staff'],['demo-admin','Porli administrator','admin']]) run('INSERT OR IGNORE INTO users VALUES(?,?,?,?,?,1)',id,name,`${id}@porli.test`,passwordHash(randomBytes(32).toString('hex')),role);
  // Add the referenced gallery only to an untouched demo fixture.
  const courtyard=one("SELECT media,version FROM properties WHERE id='demo-property-01'");
  if(seed && courtyard?.version===1 && JSON.parse(courtyard.media).length===1) {
    const media=[...JSON.parse(courtyard.media),{url:'/assets/courtyard-veranda.webp',alt:'Fictional Courtyard House: the shaded veranda viewed from the courtyard'},{url:'/assets/courtyard-detail.webp',alt:'Fictional Courtyard House: timber doorway and linen curtain detail'}];
    run("UPDATE properties SET media=?,version=version+1 WHERE id='demo-property-01'",JSON.stringify(media));
  }
  // Alt text must state where a picture came from (docs/23 section 6). The homepage has always
  // done this; listing media never did, so every gallery image said what it showed without saying
  // whether it was a photograph of a real place or a generated concept image. Applied to existing
  // rows on every start and idempotent: a suffix is only added when it is not already there.
  for (const row of all('SELECT id,media,is_demo FROM properties')) {
    let media; try { media = JSON.parse(row.media); } catch { continue; }
    if (!Array.isArray(media) || !media.length) continue;
    // A separate sentence, not another dash clause: several alt texts already end in one, and a
    // screen reader reads "Courtyard House, fictional study. Generated concept image." cleanly.
    const suffix = row.is_demo ? 'Generated concept image.' : 'Photograph supplied by the property.';
    const next = media.map(m => {
      const alt = String(m?.alt || '');
      return alt && !alt.toLowerCase().includes(suffix.toLowerCase()) ? { ...m, alt: `${alt.replace(/[\s.—-]+$/, '')}. ${suffix}` } : m;
    });
    const json = JSON.stringify(next);
    if (json !== row.media) run('UPDATE properties SET media=? WHERE id=?', json, row.id);
  }
  run("INSERT OR IGNORE INTO settings VALUES('headline','Find your next place.')");
  run("INSERT OR IGNORE INTO settings VALUES('intro','Residential and commercial property, with one team to talk to.')");
  run("UPDATE settings SET value='Residential and commercial property, with one team to talk to.' WHERE key='intro' AND value='Homes to buy and rent. Space to make your own.'");
  // Bootstrap the first administrator on a host without demo accounts.
  if (adminEmail && adminPassword) {
    const email = adminEmail.trim().toLowerCase();
    const existing = one('SELECT * FROM users WHERE email=?', email);
    if (!existing) {
      if (adminPassword.length < 12) console.error('PORLI_ADMIN_PASSWORD must be at least 12 characters. Administrator account not created.');
      else run('INSERT INTO users(id,name,email,password,role) VALUES(?,?,?,?,?)', uid(), 'Porli administrator', email, passwordHash(adminPassword), 'admin');
    } else if (existing.role !== 'admin' || !existing.active) run("UPDATE users SET role='admin',active=1 WHERE id=?", existing.id);
  }
  const limits = new Map();
  const rateLimit = (key, max) => { const time = Date.now(); let bucket = limits.get(key); if (!bucket || bucket.until < time) { bucket={count:0,until:time+60000}; limits.set(key,bucket); } if (++bucket.count > max) fail(429,'Please wait a minute before trying again.'); if (limits.size > 10000) for (const [k,v] of limits) if(v.until < time) limits.delete(k); };
  function requireUser(u) { if (!u) fail(401, 'Sign in to continue.'); return u; }
  function requireStaff(u) { requireUser(u); if (!staff(u)) fail(403,'This area is for the Porli team.'); }
  function requireAdmin(u) { requireStaff(u); if (u.role !== 'admin') fail(403,'Administrator access required.'); }
  function thread(id,u) { requireUser(u); const c = one('SELECT * FROM conversations WHERE id=?',id); if (!c || (!staff(u) && c.customer_id !== u.id)) fail(404,'Conversation not found.'); return c; }
  function available(id) { const p=one('SELECT * FROM properties WHERE id=?',id); if (!p || p.publication_state !== 'published' || p.transaction_status !== 'available') fail(409,'This home is no longer available for new enquiries or inspections.'); return p; }
  function threadView(c,u) {
    const p=one('SELECT id,slug,title,locality,sector,property_type,transaction_status,media FROM properties WHERE id=?',c.property_id);
    const messages=all('SELECT m.id,m.body,m.sender_id,m.created_at,u.name,u.role FROM messages m JOIN users u ON u.id=m.sender_id WHERE conversation_id=? ORDER BY m.rowid',c.id);
    const read=one('SELECT read_at FROM reads WHERE conversation_id=? AND user_id=?',c.id,u.id)?.read_at || '';
    const result={id:c.id,property:{...p,media:JSON.parse(p.media)},messages,unread:messages.filter(m=>m.sender_id!==u.id && m.created_at>read).length,customer:publicUser(one('SELECT * FROM users WHERE id=?',c.customer_id))};
    if(staff(u)) Object.assign(result,{stage:c.stage,assigned_to:c.assigned_to,follow_up:c.follow_up,due_at:c.due_at,blocked:c.blocked,notes:all('SELECT n.id,n.body,n.created_at,u.name FROM notes n JOIN users u ON u.id=n.author_id WHERE conversation_id=? ORDER BY n.rowid',c.id)});
    return result;
  }
  const sessionUser = token => token ? one('SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.active=1',hashToken(token),Date.now()) : null;

  /**
   * Handle one request.
   * @param {Request} request
   * @param {{remoteAddress?:string, secure?:boolean, serveStatic?:(request:Request)=>Promise<Response>}} context
   * @returns {Promise<Response>}
   */
  async function handle(request, { remoteAddress = '', secure = false, serveStatic } = {}) {
    const cookies = [];
    const send = (status, data) => { const headers = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); for (const c of cookies) headers.append('Set-Cookie', c); return new Response(JSON.stringify(data), { status, headers }); };
    let response;
    try {
      const url=new URL(request.url); const path=url.pathname; const q=url.searchParams; const method=request.method;
      if(demo && !isLoopbackHost(url.hostname)) fail(403,'Local demo host required.');
      const cookie = request.headers.get('cookie')?.match(/(?:^|;\s*)porli_session=([a-f0-9]+)/)?.[1];
      if (!path.startsWith('/api/')) {
        if (!['GET','HEAD'].includes(method)) fail(405,'Method not allowed.');
        if(path.startsWith('/uploads/')) {
          const name=decodeURIComponent(path.slice('/uploads/'.length));
          if(!uploadName.test(name)) fail(404,'Not found.');
          const viewer=sessionUser(cookie);
          const published=all("SELECT media FROM properties WHERE publication_state='published'").some(p=>JSON.parse(p.media).some(m=>m.url===path));
          if(!staff(viewer)&&!published) fail(404,'Image not found.');
          const bytes=await files.read(name);
          if(!bytes) fail(404,'Not found.');
          response=new Response(method==='HEAD'?null:bytes,{status:200,headers:{'Content-Type':mimeTypes[extname(name)]||'application/octet-stream','Cache-Control':'private, no-store'}});
        } else {
          if(!serveStatic) fail(404,'Not found.');
          response=await serveStatic(request);
        }
        return response;
      }
      // Reject cross-origin writes, including login, to prevent cookie-based CSRF.
      if(!['GET','HEAD'].includes(method)) {
        if(request.headers.get('sec-fetch-site')==='cross-site') fail(403,'Cross-site request rejected.');
        const origin=request.headers.get('origin');
        if(origin && new URL(origin).host !== url.host) fail(403,'Origin mismatch.');
        if(!request.headers.get('content-type')?.startsWith('application/json')) fail(415,'JSON request required.');
      }
      const u=sessionUser(cookie);
      let body={};
      if(!['GET','HEAD'].includes(method)) { const raw=await readBody(request); try {body=JSON.parse(raw||'{}');} catch {fail(400,'Invalid request.');} if(!body || typeof body!=='object' || Array.isArray(body)) fail(400,'Invalid request.'); }
      const login = user => {const token=randomBytes(32).toString('hex');run('DELETE FROM sessions WHERE expires<?',Date.now());run('INSERT INTO sessions VALUES(?,?,?)',hashToken(token),user.id,Date.now()+7*86400000); cookies.push(`porli_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800${secure?'; Secure':''}`); return {user:publicUser(user)};};
      if(path==='/api/session' && method==='GET') return send(200,{user:publicUser(u),demo,maps_embed_key:mapsEmbedKey});
      if(path==='/api/auth/demo' && method==='POST') { if(!demo || !isLoopbackAddress(remoteAddress)) fail(403,'Demo sign-in is disabled.');const user=one('SELECT * FROM users WHERE id=? AND active=1',`demo-${body.role}`); if(!user) fail(400,'Unknown demo account.');return send(200,login(user)); }
      if(path==='/api/auth/register' && method==='POST') { rateLimit(remoteAddress+':auth',15); const name=text(body.name,80),email=text(body.email,200).toLowerCase(),password=text(body.password,256);if(!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<12) fail(400,'Enter your name, a valid email and a password of at least 12 characters.'); if(one('SELECT id FROM users WHERE email=?',email)) fail(409,'An account with this email already exists.');const id=uid();run('INSERT INTO users(id,name,email,password) VALUES(?,?,?,?)',id,name,email,passwordHash(password));return send(201,login(one('SELECT * FROM users WHERE id=?',id))); }
      if(path==='/api/auth/login' && method==='POST') { rateLimit(remoteAddress+':auth',15); const user=one('SELECT * FROM users WHERE email=? AND active=1',text(body.email,200).toLowerCase()); if(!user || !passwordMatches(text(body.password,256),user.password)) fail(401,'Email or password is incorrect.'); return send(200,login(user)); }
      if(path==='/api/auth/logout' && method==='POST') { if(cookie) run('DELETE FROM sessions WHERE token=?',hashToken(cookie));cookies.push('porli_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return send(200,{ok:true}); }
      if(path==='/api/profile' && method==='PATCH') { requireUser(u);const name=text(body.name,80);if(!name) fail(400,'Name is required.');run('UPDATE users SET name=? WHERE id=?',name,u.id);return send(200,{user:publicUser(one('SELECT * FROM users WHERE id=?',u.id))}); }
      if(path==='/api/content' && method==='GET') return send(200,Object.fromEntries(all('SELECT * FROM settings').map(x=>[x.key,x.value])));
      if(path==='/api/content' && method==='PATCH') {requireAdmin(u);for(const key of ['headline','intro']) {if(body[key]!==undefined){const value=text(body[key],key==='headline'?80:200);if(!value)fail(400,'Copy cannot be empty.');run('UPDATE settings SET value=? WHERE key=?',value,key);}}audit(u,'content_updated','site');return send(200,{ok:true});}
      if(path==='/api/properties' && method==='GET') {
        let rows=all("SELECT * FROM properties WHERE publication_state='published' ORDER BY rowid DESC").map(property);
        if(q.get('saved')==='1') {requireUser(u);const ids=new Set(all('SELECT property_id FROM saves WHERE user_id=?',u.id).map(s=>s.property_id));rows=rows.filter(p=>ids.has(p.id));}
        else { const sector=q.get('sector')||'residential';if(!['residential','commercial','all'].includes(sector))fail(400,'Choose residential or commercial.');rows=rows.filter(p=>(sector==='all'||p.sector===sector)&&(p.transaction_status==='available'||q.get('pending')==='1'&&p.transaction_status==='under_offer')); }
        for(const key of ['min','max','beds','baths','min_floor']) if(q.has(key)&&(!Number.isFinite(Number(q.get(key)))||Number(q.get(key))<0))fail(400,'Filters must be non-negative numbers.');
        const search=(q.get('location')||'').trim().toLowerCase();const priceFiltered=q.get('min')||q.get('max');rows=rows.filter(p=>(!search||`${p.locality} ${p.title}`.toLowerCase().includes(search))&&(!q.get('type')||p.property_type===q.get('type'))&&(!priceFiltered||p.price_minor>0)&&(!q.get('min')||p.price_minor>=Number(q.get('min'))*100)&&(!q.get('max')||p.price_minor<=Number(q.get('max'))*100)&&(!q.has('beds')||(q.get('beds')==='0'?p.bedrooms===0:p.bedrooms>=Number(q.get('beds'))))&&(!q.get('baths')||p.bathrooms>=Number(q.get('baths')))&&(!q.get('tenancy')||p.tenancy===q.get('tenancy'))&&(!q.get('min_floor')||p.floor_area>=Number(q.get('min_floor'))));
        const priceRank=p=>p.price_minor===0?1:0;
        // "Featured" is a named sort the visitor can see and change, not a hidden override of
        // whatever they picked. It is the default because the one listing that can actually be
        // sold should lead; choosing any other sort turns it off completely.
        const sort=SORTS.includes(q.get('sort'))?q.get('sort'):'featured';
        if(sort==='price-asc') rows.sort((a,b)=>priceRank(a)-priceRank(b)||a.price_minor-b.price_minor);
        else if(sort==='price-desc') rows.sort((a,b)=>priceRank(a)-priceRank(b)||b.price_minor-a.price_minor);
        else if(sort==='featured') rows=[...rows.filter(p=>p.featured&&p.is_demo===false),...rows.filter(p=>!(p.featured&&p.is_demo===false))];
        return send(200,{properties:rows,total:rows.length});
      }
      const detail=path.match(/^\/api\/properties\/([^/]+)$/);
      if(detail && method==='GET'){const p=property(one('SELECT * FROM properties WHERE slug=? OR id=?',detail[1],detail[1]));if(!p || (p.publication_state!=='published'&&!staff(u)))fail(404,'This home is not publicly listed.');return send(200,{property:p,slots:all('SELECT * FROM slots WHERE property_id=? AND cancelled=0 AND starts_at>? ORDER BY starts_at',p.id,now())});}
      if(path==='/api/saves' && method==='GET') {requireUser(u);return send(200,{ids:all('SELECT property_id FROM saves WHERE user_id=?',u.id).map(s=>s.property_id)});}
      if(path==='/api/saves' && ['POST','DELETE'].includes(method)) {requireUser(u);if(!one("SELECT id FROM properties WHERE id=? AND publication_state='published'",body.property_id))fail(404,'Home not found.');if(method==='POST')run('INSERT OR IGNORE INTO saves VALUES(?,?)',u.id,body.property_id);else run('DELETE FROM saves WHERE user_id=? AND property_id=?',u.id,body.property_id);return send(200,{ok:true});}
      if(path==='/api/conversations' && method==='GET') {requireUser(u);const rows=staff(u)?all('SELECT * FROM conversations ORDER BY rowid DESC'):all('SELECT * FROM conversations WHERE customer_id=? ORDER BY rowid DESC',u.id);return send(200,{conversations:rows.map(c=>threadView(c,u))});}
      if(path==='/api/conversations' && method==='POST') {requireUser(u);rateLimit(u.id+':message',40);const message=text(body.body),key=text(body.client_key,100);if(!message||!key)fail(400,'Write a message before sending.');const previous=one('SELECT conversation_id FROM messages WHERE sender_id=? AND client_key=?',u.id,key);if(previous)return send(200,{id:previous.conversation_id});const result=transaction(()=>{let c=one('SELECT * FROM conversations WHERE property_id=? AND customer_id=?',body.property_id,u.id);if(!c){available(body.property_id);c={id:uid()};run('INSERT INTO conversations(id,property_id,customer_id,created_at) VALUES(?,?,?,?)',c.id,body.property_id,u.id,now());}else if(c.blocked)fail(403,'Messaging is unavailable for this conversation.');run('INSERT INTO messages VALUES(?,?,?,?,?,?)',uid(),c.id,u.id,message,key,now());run("UPDATE conversations SET stage=CASE WHEN stage='closed' THEN 'in_conversation' ELSE stage END WHERE id=?",c.id);return{id:c.id};});return send(201,result);}
      const conv=path.match(/^\/api\/conversations\/([^/]+)(?:\/(messages|notes|read))?$/);
      if(conv){const c=thread(conv[1],u);const action=conv[2];
        if(method==='GET'&&!action)return send(200,threadView(c,u));
        if(method==='POST'&&action==='read'){run('INSERT INTO reads VALUES(?,?,?) ON CONFLICT(conversation_id,user_id) DO UPDATE SET read_at=excluded.read_at',c.id,u.id,now());return send(200,{ok:true});}
        if(method==='POST'&&['messages','notes'].includes(action)){if(action==='notes')requireStaff(u);if(c.blocked&& !staff(u))fail(403,'Messaging is unavailable.');rateLimit(u.id+':message',40);const value=text(body.body);if(!value)fail(400,'Write something first.');if(action==='notes'){run('INSERT INTO notes VALUES(?,?,?,?,?)',uid(),c.id,u.id,value,now());}else{const key=text(body.client_key,100);if(!key)fail(400,'Message key is required.');const old=one('SELECT conversation_id FROM messages WHERE sender_id=? AND client_key=?',u.id,key);if(old&&old.conversation_id!==c.id)fail(409,'Message key belongs to another conversation.');run('INSERT OR IGNORE INTO messages VALUES(?,?,?,?,?,?)',uid(),c.id,u.id,value,key,now());if(!staff(u)&&c.stage==='closed')run("UPDATE conversations SET stage='in_conversation' WHERE id=?",c.id);}return send(200,{ok:true});}
        if(method==='PATCH'&&!action){requireStaff(u);const stage=body.stage??c.stage;if(!['new','in_conversation','inspection','offer_application','closed'].includes(stage))fail(400,'Invalid stage.');const assigned=body.assigned_to===undefined?c.assigned_to:body.assigned_to||null;if(assigned&&!one("SELECT id FROM users WHERE id=? AND active=1 AND role IN ('staff','admin')",assigned))fail(400,'Choose an active team member.');const due=text(body.due_at??c.due_at,40);if(due&&Number.isNaN(Date.parse(due)))fail(400,'Choose a valid follow-up time.');run('UPDATE conversations SET stage=?,assigned_to=?,follow_up=?,due_at=?,blocked=? WHERE id=?',stage,assigned,text(body.follow_up??c.follow_up,300),due,body.blocked===undefined?c.blocked:Number(!!body.blocked),c.id);audit(u,'conversation_updated',c.id,{stage});return send(200,{ok:true});}
      }
      if(path==='/api/inspections' && method==='GET'){requireUser(u);return send(200,{inspections:all(`SELECT i.*,p.title,p.slug,p.transaction_status,s.starts_at,u.name FROM inspections i JOIN properties p ON p.id=i.property_id LEFT JOIN slots s ON s.id=i.slot_id JOIN users u ON u.id=i.customer_id ${staff(u)?'':'WHERE i.customer_id=?'} ORDER BY i.rowid DESC`,...staff(u)?[]:[u.id])});}
      if(path==='/api/inspections' && method==='POST'){requireUser(u);available(body.property_id);const slot=body.slot_id?one('SELECT * FROM slots WHERE id=? AND property_id=? AND cancelled=0 AND starts_at>?',body.slot_id,body.property_id,now()):null;if(body.slot_id&&!slot)fail(400,'Choose an available inspection slot.');const proposed=text(body.proposed,300);if(!slot&&!proposed)fail(400,'Choose a time or suggest an alternative.');const old=slot?one("SELECT id FROM inspections WHERE customer_id=? AND slot_id=? AND status IN ('requested','confirmed')",u.id,slot.id):null;if(old)return send(200,{id:old.id});const id=uid();run('INSERT INTO inspections(id,property_id,customer_id,slot_id,proposed,status,created_at) VALUES(?,?,?,?,?,?,?)',id,body.property_id,u.id,slot?.id||null,proposed,'requested',now());return send(201,{id});}
      const inspection=path.match(/^\/api\/inspections\/([^/]+)$/);
      if(inspection&&method==='PATCH'){requireUser(u);transaction(()=>{const i=one('SELECT * FROM inspections WHERE id=?',inspection[1]);if(!i||!staff(u)&&i.customer_id!==u.id)fail(404,'Inspection not found.');if(!staff(u)&&body.status!=='cancelled')fail(403,'Only staff can confirm an inspection.');const next=body.status;if(!({requested:['confirmed','cancelled'],confirmed:['completed','cancelled'],completed:[],cancelled:[]}[i.status]||[]).includes(next))fail(409,'This inspection cannot make that transition.');if(next==='confirmed'){available(i.property_id);const slot=one('SELECT * FROM slots WHERE id=? AND cancelled=0 AND starts_at>?',body.slot_id||i.slot_id||'',now());if(!slot||slot.property_id!==i.property_id)fail(400,'Choose a future inspection slot before confirming.');if(one("SELECT COUNT(*) n FROM inspections WHERE slot_id=? AND status='confirmed'",slot.id).n>=slot.capacity)fail(409,'This inspection is full. Choose another time.');if(one("SELECT id FROM inspections WHERE slot_id=? AND customer_id=? AND id<>? AND status IN ('requested','confirmed')",slot.id,i.customer_id,i.id))fail(409,'This customer already has a request for that slot.');run('UPDATE inspections SET slot_id=? WHERE id=?',slot.id,i.id);}run('UPDATE inspections SET status=?,reason=? WHERE id=?',next,text(body.reason,300),i.id);audit(u,'inspection_'+next,i.id);});return send(200,{ok:true});}
      if(path==='/api/admin/slots'&&method==='POST'){requireStaff(u);if(!one('SELECT id FROM properties WHERE id=?',body.property_id))fail(404,'Home not found.');if(!body.starts_at||!(Date.parse(body.starts_at)>Date.now()))fail(400,'Choose a future date and time.');const capacity=Number(body.capacity);if(!Number.isInteger(capacity)||capacity<1||capacity>100)fail(400,'Capacity must be 1–100.');run('INSERT INTO slots(id,property_id,starts_at,capacity) VALUES(?,?,?,?)',uid(),body.property_id,new Date(body.starts_at).toISOString(),capacity);return send(201,{ok:true});}
      if(path==='/api/admin/properties'&&method==='GET'){requireStaff(u);return send(200,{properties:all('SELECT * FROM properties ORDER BY rowid DESC').map(property)});}
      if(path==='/api/admin/properties'&&['POST','PATCH'].includes(method)){requireStaff(u);const existing=body.id?one('SELECT * FROM properties WHERE id=?',body.id):null;if(body.id&&!existing)fail(404,'Listing not found.');if(existing&&Number(body.version)!==existing.version)fail(409,'Another team member changed this listing. Reload before saving.');const p={...(existing?property(existing):{id:uid(),slug:uid(),title:'Untitled home',property_type:'house',price_minor:0,price_label:'',currency:'AUD',is_demo:1,bedrooms:0,bathrooms:0,parking:0,locality:'',summary:'',description:'',publication_state:'draft',transaction_status:'available',media:[],features:[],details:[],highlights:[],featured:0,available_date:'',listed_at:'',sector:'residential',sale_method:'private_sale',floor_area:0,land_area:0,zoning:'',tenancy:'',address:'',latitude:0,longitude:0,directions:'',why:'',feature_groups:[],documents:[]}),...body};
        if(!TRANSACTION_STATUSES.includes(p.transaction_status))fail(400,'Invalid availability status.');if(!['residential','commercial'].includes(p.sector)||!['draft','published','archived'].includes(p.publication_state))fail(400,'Invalid property type or publication state.');if(!PROPERTY_TYPES[p.sector].includes(p.property_type))fail(400,'Choose a property type that matches the sector.');for(const key of ['price_minor','bedrooms','bathrooms','parking','floor_area','land_area'])if(!Number.isSafeInteger(Number(p[key]))||Number(p[key])<0)fail(400,'Price and property facts must be non-negative whole numbers.');
        if(!Array.isArray(p.media)||p.media.length>30)fail(400,'Each photograph needs an uploaded image and descriptive alternative text.');
        for(const m of p.media) if(typeof m?.url!=='string'||!/^\/(assets|uploads)\/[a-zA-Z0-9_.-]+\.(webp|png|jpg)$/.test(m.url)||!text(m.alt,200)||!(await files.exists(m.url)))fail(400,'Each photograph needs an uploaded image and descriptive alternative text.');
        if(!Array.isArray(p.features))fail(400,'Invalid features.');
        p.price_label=text(p.price_label,60);
        if(!['AUD','THB','USD'].includes(p.currency))fail(400,'Choose a valid currency: AUD, THB or USD.');
        p.is_demo=Number(!!p.is_demo);
        if(!Array.isArray(p.details)||p.details.length>30||p.details.some(d=>!Array.isArray(d)||d.length!==2||typeof d[0]!=='string'||typeof d[1]!=='string'))fail(400,'Property details must be up to 30 pairs of a label and a value.');
        p.details=p.details.map(([label,value])=>[text(label,80),text(value,80)]);
        if(!Array.isArray(p.highlights)||p.highlights.length>6||p.highlights.some(h=>typeof h!=='string'))fail(400,'Highlights must be up to 6 short phrases.');
        p.highlights=p.highlights.map(h=>text(h,60));
        p.why=text(p.why,2000);
        if(!Array.isArray(p.feature_groups)||p.feature_groups.length>8||p.feature_groups.some(g=>!Array.isArray(g)||g.length!==2||typeof g[0]!=='string'||!Array.isArray(g[1])||g[1].length>20||g[1].some(f=>typeof f!=='string')))fail(400,'Feature groups must be up to 8 pairs of a group name and a list of features.');
        p.feature_groups=p.feature_groups.map(([label,items])=>[text(label,40),items.map(f=>text(f,80)).filter(Boolean)]).filter(([label,items])=>label&&items.length);
        // A document is a floor plan or information memorandum the property has supplied. Only an
        // uploaded PDF or an https link is accepted: the page must never offer a download that fails.
        if(!Array.isArray(p.documents)||p.documents.length>6||p.documents.some(d=>!Array.isArray(d)||d.length!==2||typeof d[0]!=='string'||typeof d[1]!=='string'||!/^(\/uploads\/[a-zA-Z0-9_.-]+\.pdf|https:\/\/[^\s"']+)$/.test(d[1].trim())))fail(400,'Each document needs a label and either an uploaded PDF or an https link.');
        p.documents=p.documents.map(([label,url])=>[text(label,60),text(url,500)]).filter(([label])=>label);
        if(!SALE_METHODS.includes(p.sale_method))fail(400,'Choose a valid sale method.');
        if(!TENANCIES.includes(p.tenancy))fail(400,'Choose a valid tenancy.');
        p.zoning=text(p.zoning,80);
        p.address=text(p.address,200);
        p.directions=text(p.directions,1000);
        const latitude=Number(p.latitude), longitude=Number(p.longitude);
        if(!Number.isFinite(latitude)||!Number.isFinite(longitude))fail(400,'Enter both latitude and longitude, or neither.');
        if(latitude===0 || longitude===0){ if(latitude!==longitude) fail(400,'Enter both latitude and longitude, or neither.'); }
        else if(latitude<-90||latitude>90||longitude<-180||longitude>180) fail(400,'Latitude must be between -90 and 90, and longitude between -180 and 180.');
        p.latitude=latitude; p.longitude=longitude;
        const publicationChanged=!existing||existing.publication_state!=='published';
        if(p.publication_state==='published') {
          if(!text(p.title)||!text(p.locality)||!text(p.description)||(p.price_minor<=0&&!p.price_label)||!p.media.length)fail(400,'Published listings require a title, locality, a positive price or a price label, description and cover photograph.');
          if((publicationChanged||JSON.stringify(p.media)!==existing.media)&&new Set(p.media.map(m=>m.url)).size<3)fail(400,'Publishing requires at least three distinct photographs.');
          if(!p.listed_at)p.listed_at=now();
        }
        transaction(()=>{const cols=['title','mode','property_type','price_minor','price_label','currency','is_demo','bedrooms','bathrooms','parking','locality','summary','description','publication_state','transaction_status','media','features','details','highlights','featured','available_date','listed_at','sector','sale_method','floor_area','land_area','zoning','tenancy','address','latitude','longitude','directions','why','feature_groups','documents'];const vals=cols.map(k=>['media','features','details','highlights','feature_groups','documents'].includes(k)?JSON.stringify(p[k]):['price_minor','bedrooms','bathrooms','parking','featured','is_demo','floor_area','land_area','latitude','longitude'].includes(k)?Number(p[k]):k==='mode'?'buy':k==='available_date'?'':k==='directions'?text(p[k],1000):k==='why'?text(p[k],2000):k==='address'?text(p[k],200):text(p[k],k==='description'?10000:500));if(existing)run(`UPDATE properties SET ${cols.map(k=>k+'=?').join(',')},version=version+1 WHERE id=?`,...vals,existing.id);else run(`INSERT INTO properties(id,slug,${cols.join(',')},created_at) VALUES(${Array(cols.length+3).fill('?').join(',')})`,p.id,text(p.title,60).toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+p.id.slice(0,6),...vals,now());if(existing?.transaction_status!==p.transaction_status){run('UPDATE outcomes SET reversed=1 WHERE property_id=? AND reversed=0',p.id);if(p.transaction_status==='sold')run('INSERT INTO outcomes VALUES(?,?,?,0,?)',uid(),p.id,p.transaction_status,now());}audit(u,'property_saved',p.id,{publication:p.publication_state,status:p.transaction_status});});return send(200,{property:property(one('SELECT * FROM properties WHERE id=?',p.id))});}
      if(path==='/api/admin/upload'&&method==='POST'){requireStaff(u);const data=text(body.data,7_500_000);const match=data.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);if(!match)fail(400,'Use a PNG, JPEG or WebP image.');const bytes=Buffer.from(match[2],'base64');if(bytes.length>5*1024*1024)fail(413,'Maximum image size is 5 MB.');const valid=match[1]==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):match[1]==='jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';if(!valid)fail(400,'Image contents do not match the file type.');const file=uid()+'.'+(match[1]==='jpeg'?'jpg':match[1]);await files.write(file,bytes);return send(201,{url:'/uploads/'+file});}
      if(path==='/api/admin/dashboard'&&method==='GET'){requireStaff(u);const days=Number(q.get('days')||30);if(![7,30,90].includes(days))fail(400,'Choose a valid reporting period.');const since=new Date(Date.now()-days*86400000).toISOString();const cs=all('SELECT * FROM conversations').map(c=>threadView(c,u));const lastCustomer=c=>c.messages.at(-1)?.role==='customer';const awaiting=cs.filter(c=>!c.blocked&&c.stage!=='closed'&&lastCustomer(c));const activity=all("SELECT DISTINCT m.conversation_id,c.property_id,c.customer_id FROM messages m JOIN conversations c ON c.id=m.conversation_id JOIN users u ON u.id=m.sender_id WHERE u.role='customer' AND m.created_at>=?",since);return send(200,{days,live:one("SELECT COUNT(*) n FROM properties WHERE publication_state='published' AND transaction_status='available'").n,awaiting:awaiting.length,people:new Set(activity.map(a=>a.customer_id)).size,enquired:new Set(activity.map(a=>a.property_id)).size,new_conversations:one('SELECT COUNT(*) n FROM conversations WHERE created_at>=?',since).n,inspection_requests:one('SELECT COUNT(*) n FROM inspections WHERE created_at>=?',since).n,outcomes:one('SELECT COUNT(DISTINCT property_id) n FROM outcomes WHERE reversed=0 AND created_at>=?',since).n,overdue:cs.filter(c=>c.stage!=='closed'&&c.due_at&&c.due_at<now()).length,queue:awaiting});}
      if(path==='/api/admin/team'&&method==='GET'){requireStaff(u);return send(200,{users:all('SELECT id,name,email,role,active FROM users ORDER BY name')});}
      if(path==='/api/admin/team'&&method==='PATCH'){requireAdmin(u);if(body.id===u.id)fail(400,'You cannot change your own access.');if(!['customer','staff','admin'].includes(body.role))fail(400,'Invalid role.');if(!one('SELECT id FROM users WHERE id=?',body.id))fail(404,'Account not found.');run('UPDATE users SET role=?,active=? WHERE id=?',body.role,body.active?1:0,body.id);run('DELETE FROM sessions WHERE user_id=?',body.id);audit(u,'access_changed',body.id);return send(200,{ok:true});}
      fail(404,'Not found.');
    } catch(e) {
      if(!e.status) console.error(e);
      // A request rejected before its body was read (CSRF, demo host, method checks) must
      // release the stream, otherwise the Cloudflare runtime reports an uncaught error when
      // it tries to read the body after the response has been sent.
      if(request.body && !request.bodyUsed) await request.body.cancel().catch(()=>{});
      return json(e.status||500,{error:e.status?e.message:'Something went wrong. Please try again.'});
    }
  }
  return { handle: async (request, context) => withSecurityHeaders(await handle(request, context)) };
}
