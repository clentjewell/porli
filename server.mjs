import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID, randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const now = () => new Date().toISOString();
const uid = () => randomUUID();
const hashToken = t => createHash('sha256').update(t).digest('hex');
function passwordHash(password, salt = randomBytes(16).toString('hex')) { return salt + ':' + scryptSync(password, salt, 64).toString('hex'); }
function passwordMatches(password, stored) { const parts = stored.split(':'); return parts.length === 2 && timingSafeEqual(Buffer.from(passwordHash(password, parts[0])), Buffer.from(stored)); }
function fail(status, message) { throw Object.assign(new Error(message), { status }); }
const text = (v, max = 5000) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const staff = u => u && ['staff', 'admin'].includes(u.role);
const publicUser = u => u ? { id: u.id, name: u.name, email: u.email, role: u.role } : null;
const allowedStatus = { buy: ['available','under_offer','sold','withdrawn'], rent: ['available','application_pending','leased','withdrawn'] };

export function createApp({ dbPath = process.env.PORLI_DB || join(root, 'var/porli.sqlite'), demo = process.env.PORLI_DEMO !== '0' } = {}) {
  if (dbPath !== ':memory:') mkdirSync(dirname(resolve(dbPath)), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
  db.exec(readFileSync(join(root, 'migrations/001.sql'), 'utf8'));
  const one = (sql, ...args) => db.prepare(sql).get(...args);
  const all = (sql, ...args) => db.prepare(sql).all(...args);
  const run = (sql, ...args) => db.prepare(sql).run(...args);
  const transaction = fn => { db.exec('BEGIN IMMEDIATE'); try { const result = fn(); db.exec('COMMIT'); return result; } catch (e) { db.exec('ROLLBACK'); throw e; } };
  const audit = (u, action, subject, details = {}) => run('INSERT INTO audit VALUES(?,?,?,?,?,?)', uid(), u.id, action, subject, JSON.stringify(details), now());
  const property = p => p ? { ...p, media: JSON.parse(p.media), features: JSON.parse(p.features), currency: 'AUD', rent_frequency: p.mode === 'rent' ? 'week' : null, is_demo: true, address_display: 'locality_only' } : null;
  if (!one('SELECT id FROM properties LIMIT 1') && demo) {
    const fixture = JSON.parse(readFileSync(join(root, 'data/demo-properties.json'), 'utf8')).properties;
    const images = ['courtyard','apartment','townhouse','veranda','apartment','townhouse','veranda','apartment'];
    const summaries = ['A quiet courtyard, open doors and room to slow down.','Soft morning light and a little green space of your own.','Warm brick, a private entrance and everyday practicality.','Space for the family, from the garden to the veranda.'];
    fixture.forEach((p, i) => run('INSERT INTO properties(id,slug,title,mode,property_type,price_minor,bedrooms,bathrooms,parking,locality,summary,description,publication_state,transaction_status,media,features,featured,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', p.id,p.slug,p.title,p.mode,p.property_type,p.price_minor,p.bedrooms,p.bathrooms,p.parking,p.locality.replace(' (fictional)',''),summaries[i % 4], `${summaries[i % 4]} ${i === 0 ? 'Limewashed brick and timber frame an open courtyard. A shaded veranda connects the living spaces with the garden, while broad doorways bring light through the house.' : i === 1 ? 'The living room opens onto a planted balcony. Pale walls, oak shelving and considered proportions make a compact home feel comfortable.' : i === 3 ? 'A covered outdoor room looks onto an established garden. The single-storey layout keeps living spaces connected, with room for quiet corners.' : 'A considered home with natural materials and practical living spaces.'} This is a fictional listing with generated concept imagery.`,p.publication_state,p.transaction_status,JSON.stringify([{url:`/assets/${images[i]}.webp`,alt:`${p.title} — fictional architectural study`}]),JSON.stringify(i === 0 ? ['Private courtyard','Covered veranda','Timber finishes','Established planting'] : ['Natural light','Outdoor space','Practical layout']),i === 0 ? 1 : 0,now()));
    for (const [id,name,role] of [['demo-customer','Alex Morgan','customer'],['demo-other','Jamie Ellis','customer'],['demo-staff','Sam Taylor','staff'],['demo-admin','Porli administrator','admin']]) run('INSERT INTO users VALUES(?,?,?,?,?,1)',id,name,`${id}@porli.test`,passwordHash(randomBytes(32).toString('hex')),role);
    for (const p of fixture.filter(p => p.transaction_status === 'available' && p.publication_state === 'published')) {
      for (let day = 2; day <= 4; day += 2) { const date = new Date(); date.setUTCDate(date.getUTCDate()+day); date.setUTCHours(0,30,0,0); run('INSERT INTO slots(id,property_id,starts_at,capacity) VALUES(?,?,?,?)',uid(),p.id,date.toISOString(),4); }
    }
  }
  // Add the referenced gallery only to an untouched demo fixture.
  const courtyard=one("SELECT media,version FROM properties WHERE id='demo-property-01'");
  if(demo && courtyard?.version===1 && JSON.parse(courtyard.media).length===1 && existsSync(join(root,'public/assets/courtyard-veranda.webp'))) {
    const media=[...JSON.parse(courtyard.media),{url:'/assets/courtyard-veranda.webp',alt:'Fictional Courtyard House: the shaded veranda viewed from the courtyard'},{url:'/assets/courtyard-detail.webp',alt:'Fictional Courtyard House: timber doorway and linen curtain detail'}];
    run("UPDATE properties SET media=?,version=version+1 WHERE id='demo-property-01'",JSON.stringify(media));
  }
  run("INSERT OR IGNORE INTO settings VALUES('headline','Find your next place.')");
  run("INSERT OR IGNORE INTO settings VALUES('intro','Homes to buy and rent. Space to make your own.')");
  const limits = new Map();
  const rateLimit = (key, max) => { const time = Date.now(); let bucket = limits.get(key); if (!bucket || bucket.until < time) { bucket={count:0,until:time+60000}; limits.set(key,bucket); } if (++bucket.count > max) fail(429,'Please wait a minute before trying again.'); if (limits.size > 10000) for (const [k,v] of limits) if(v.until < time) limits.delete(k); };
  function requireUser(u) { if (!u) fail(401, 'Sign in to continue.'); return u; }
  function requireStaff(u) { requireUser(u); if (!staff(u)) fail(403,'This area is for the Porli team.'); }
  function requireAdmin(u) { requireStaff(u); if (u.role !== 'admin') fail(403,'Administrator access required.'); }
  function thread(id,u) { requireUser(u); const c = one('SELECT * FROM conversations WHERE id=?',id); if (!c || (!staff(u) && c.customer_id !== u.id)) fail(404,'Conversation not found.'); return c; }
  function available(id) { const p=one('SELECT * FROM properties WHERE id=?',id); if (!p || p.publication_state !== 'published' || p.transaction_status !== 'available') fail(409,'This home is no longer available for new enquiries or inspections.'); return p; }
  function threadView(c,u) {
    const p=one('SELECT id,slug,title,locality,mode,transaction_status,media FROM properties WHERE id=?',c.property_id);
    const messages=all('SELECT m.id,m.body,m.sender_id,m.created_at,u.name,u.role FROM messages m JOIN users u ON u.id=m.sender_id WHERE conversation_id=? ORDER BY m.rowid',c.id);
    const read=one('SELECT read_at FROM reads WHERE conversation_id=? AND user_id=?',c.id,u.id)?.read_at || '';
    const result={id:c.id,property:{...p,media:JSON.parse(p.media)},messages,unread:messages.filter(m=>m.sender_id!==u.id && m.created_at>read).length,customer:publicUser(one('SELECT * FROM users WHERE id=?',c.customer_id))};
    if(staff(u)) Object.assign(result,{stage:c.stage,assigned_to:c.assigned_to,follow_up:c.follow_up,due_at:c.due_at,blocked:c.blocked,notes:all('SELECT n.id,n.body,n.created_at,u.name FROM notes n JOIN users u ON u.id=n.author_id WHERE conversation_id=? ORDER BY n.rowid',c.id)});
    return result;
  }
  const server = http.createServer(async (req,res) => {
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Referrer-Policy','same-origin');
    res.setHeader('X-Frame-Options','DENY');
    res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
    try {
      const url=new URL(req.url,'http://localhost'); const path=url.pathname; const q=url.searchParams;
      if(demo && !['127.0.0.1','localhost','[::1]'].includes(new URL('http://'+req.headers.host).hostname)) fail(403,'Local demo host required.');
      if (!path.startsWith('/api/')) {
        if (!['GET','HEAD'].includes(req.method)) fail(405,'Method not allowed.');
        const rel=path==='/'?'index.html':decodeURIComponent(path).slice(1);
        if(path.startsWith('/uploads/')) {
          const token=req.headers.cookie?.match(/(?:^|;\s*)porli_session=([a-f0-9]+)/)?.[1];
          const viewer=token?one('SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.active=1',hashToken(token),Date.now()):null;
          const published=all("SELECT media FROM properties WHERE publication_state='published'").some(p=>JSON.parse(p.media).some(m=>m.url===path));
          if(!staff(viewer)&&!published) fail(404,'Image not found.');
          res.setHeader('Cache-Control','private, no-store');
        }
        let file=resolve(root,'public',rel); const publicRoot=resolve(root,'public');
        if(!file.startsWith(publicRoot + '/') && !file.startsWith(publicRoot + '\\')) fail(404,'Not found.');
        if(!existsSync(file)) { if(extname(rel)) fail(404,'Not found.'); file=join(publicRoot,'index.html'); }
        const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'}[extname(file)] || 'application/octet-stream';
        res.writeHead(200,{'Content-Type':mime,'Cache-Control':path.startsWith('/uploads/')?'private, no-store':['.html','.js','.css'].includes(extname(file))?'no-cache':'public, max-age=3600'}); res.end(req.method==='HEAD'?undefined:readFileSync(file)); return;
      }
      // Reject cross-origin writes, including login, to prevent cookie-based CSRF.
      if(!['GET','HEAD'].includes(req.method)) {
        if(req.headers['sec-fetch-site']==='cross-site') fail(403,'Cross-site request rejected.');
        if(req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) fail(403,'Origin mismatch.');
        if(!req.headers['content-type']?.startsWith('application/json')) fail(415,'JSON request required.');
      }
      const cookie = req.headers.cookie?.match(/(?:^|;\s*)porli_session=([a-f0-9]+)/)?.[1];
      const u=cookie?one('SELECT u.* FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.active=1',hashToken(cookie),Date.now()):null;
      let body={};
      if(!['GET','HEAD'].includes(req.method)) { let raw=''; for await(const chunk of req) {raw+=chunk; if(raw.length>8_000_000) fail(413,'File is too large. Maximum upload is 5 MB.');} try {body=JSON.parse(raw||'{}');} catch {fail(400,'Invalid request.');} if(!body || typeof body!=='object' || Array.isArray(body)) fail(400,'Invalid request.'); }
      const login = user => {const token=randomBytes(32).toString('hex');run('DELETE FROM sessions WHERE expires<?',Date.now());run('INSERT INTO sessions VALUES(?,?,?)',hashToken(token),user.id,Date.now()+7*86400000); res.setHeader('Set-Cookie',`porli_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800${req.socket.encrypted?'; Secure':''}`); return {user:publicUser(user)};};
      if(path==='/api/session' && req.method==='GET') return send(200,{user:publicUser(u),demo});
      if(path==='/api/auth/demo' && req.method==='POST') { if(!demo || !['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)) fail(403,'Demo sign-in is disabled.');const user=one('SELECT * FROM users WHERE id=? AND active=1',`demo-${body.role}`); if(!user) fail(400,'Unknown demo account.');return send(200,login(user)); }
      if(path==='/api/auth/register' && req.method==='POST') { rateLimit(req.socket.remoteAddress+':auth',15); const name=text(body.name,80),email=text(body.email,200).toLowerCase(),password=text(body.password,256);if(!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||password.length<12) fail(400,'Enter your name, a valid email and a password of at least 12 characters.'); if(one('SELECT id FROM users WHERE email=?',email)) fail(409,'An account with this email already exists.');const id=uid();run('INSERT INTO users(id,name,email,password) VALUES(?,?,?,?)',id,name,email,passwordHash(password));return send(201,login(one('SELECT * FROM users WHERE id=?',id))); }
      if(path==='/api/auth/login' && req.method==='POST') { rateLimit(req.socket.remoteAddress+':auth',15); const user=one('SELECT * FROM users WHERE email=? AND active=1',text(body.email,200).toLowerCase()); if(!user || !passwordMatches(text(body.password,256),user.password)) fail(401,'Email or password is incorrect.'); return send(200,login(user)); }
      if(path==='/api/auth/logout' && req.method==='POST') { if(cookie) run('DELETE FROM sessions WHERE token=?',hashToken(cookie));res.setHeader('Set-Cookie','porli_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return send(200,{ok:true}); }
      if(path==='/api/profile' && req.method==='PATCH') { requireUser(u);const name=text(body.name,80);if(!name) fail(400,'Name is required.');run('UPDATE users SET name=? WHERE id=?',name,u.id);return send(200,{user:publicUser(one('SELECT * FROM users WHERE id=?',u.id))}); }
      if(path==='/api/content' && req.method==='GET') return send(200,Object.fromEntries(all('SELECT * FROM settings').map(x=>[x.key,x.value])));
      if(path==='/api/content' && req.method==='PATCH') {requireAdmin(u);for(const key of ['headline','intro']) {if(body[key]!==undefined){const value=text(body[key],key==='headline'?80:200);if(!value)fail(400,'Copy cannot be empty.');run('UPDATE settings SET value=? WHERE key=?',value,key);}}audit(u,'content_updated','site');return send(200,{ok:true});}
      if(path==='/api/properties' && req.method==='GET') {
        let rows=all("SELECT * FROM properties WHERE publication_state='published' ORDER BY rowid DESC").map(property);
        if(q.get('saved')==='1') {requireUser(u);const ids=new Set(all('SELECT property_id FROM saves WHERE user_id=?',u.id).map(s=>s.property_id));rows=rows.filter(p=>ids.has(p.id));}
        else { const mode=q.get('mode')||'buy';if(!['buy','rent','all'].includes(mode))fail(400,'Choose Buy or Rent.');rows=rows.filter(p=>(mode==='all'||p.mode===mode)&&(p.transaction_status==='available'||q.get('pending')==='1'&&['under_offer','application_pending'].includes(p.transaction_status))); }
        for(const key of ['min','max','beds','baths']) if(q.has(key)&&(!Number.isFinite(Number(q.get(key)))||Number(q.get(key))<0))fail(400,'Filters must be non-negative numbers.');
        const search=(q.get('location')||'').trim().toLowerCase();rows=rows.filter(p=>(!search||`${p.locality} ${p.title}`.toLowerCase().includes(search))&&(!q.get('type')||p.property_type===q.get('type'))&&(!q.get('min')||p.price_minor>=Number(q.get('min'))*100)&&(!q.get('max')||p.price_minor<=Number(q.get('max'))*100)&&(!q.has('beds')||(q.get('beds')==='0'?p.bedrooms===0:p.bedrooms>=Number(q.get('beds'))))&&(!q.get('baths')||p.bathrooms>=Number(q.get('baths')))&&(!q.get('by')||!p.available_date||p.available_date<=q.get('by')));
        if(q.get('sort')==='price-asc') rows.sort((a,b)=>a.price_minor-b.price_minor);if(q.get('sort')==='price-desc')rows.sort((a,b)=>b.price_minor-a.price_minor);
        return send(200,{properties:rows,total:rows.length});
      }
      const detail=path.match(/^\/api\/properties\/([^/]+)$/);
      if(detail && req.method==='GET'){const p=property(one('SELECT * FROM properties WHERE slug=? OR id=?',detail[1],detail[1]));if(!p || (p.publication_state!=='published'&&!staff(u)))fail(404,'This home is not publicly listed.');return send(200,{property:p,slots:all('SELECT * FROM slots WHERE property_id=? AND cancelled=0 AND starts_at>? ORDER BY starts_at',p.id,now())});}
      if(path==='/api/saves' && req.method==='GET') {requireUser(u);return send(200,{ids:all('SELECT property_id FROM saves WHERE user_id=?',u.id).map(s=>s.property_id)});}
      if(path==='/api/saves' && ['POST','DELETE'].includes(req.method)) {requireUser(u);if(!one("SELECT id FROM properties WHERE id=? AND publication_state='published'",body.property_id))fail(404,'Home not found.');if(req.method==='POST')run('INSERT OR IGNORE INTO saves VALUES(?,?)',u.id,body.property_id);else run('DELETE FROM saves WHERE user_id=? AND property_id=?',u.id,body.property_id);return send(200,{ok:true});}
      if(path==='/api/conversations' && req.method==='GET') {requireUser(u);const rows=staff(u)?all('SELECT * FROM conversations ORDER BY rowid DESC'):all('SELECT * FROM conversations WHERE customer_id=? ORDER BY rowid DESC',u.id);return send(200,{conversations:rows.map(c=>threadView(c,u))});}
      if(path==='/api/conversations' && req.method==='POST') {requireUser(u);rateLimit(u.id+':message',40);const message=text(body.body),key=text(body.client_key,100);if(!message||!key)fail(400,'Write a message before sending.');const previous=one('SELECT conversation_id FROM messages WHERE sender_id=? AND client_key=?',u.id,key);if(previous)return send(200,{id:previous.conversation_id});const result=transaction(()=>{let c=one('SELECT * FROM conversations WHERE property_id=? AND customer_id=?',body.property_id,u.id);if(!c){available(body.property_id);c={id:uid()};run('INSERT INTO conversations(id,property_id,customer_id,created_at) VALUES(?,?,?,?)',c.id,body.property_id,u.id,now());}else if(c.blocked)fail(403,'Messaging is unavailable for this conversation.');run('INSERT INTO messages VALUES(?,?,?,?,?,?)',uid(),c.id,u.id,message,key,now());run("UPDATE conversations SET stage=CASE WHEN stage='closed' THEN 'in_conversation' ELSE stage END WHERE id=?",c.id);return{id:c.id};});return send(201,result);}
      const conv=path.match(/^\/api\/conversations\/([^/]+)(?:\/(messages|notes|read))?$/);
      if(conv){const c=thread(conv[1],u);const action=conv[2];
        if(req.method==='GET'&&!action)return send(200,threadView(c,u));
        if(req.method==='POST'&&action==='read'){run('INSERT INTO reads VALUES(?,?,?) ON CONFLICT(conversation_id,user_id) DO UPDATE SET read_at=excluded.read_at',c.id,u.id,now());return send(200,{ok:true});}
        if(req.method==='POST'&&['messages','notes'].includes(action)){if(action==='notes')requireStaff(u);if(c.blocked&& !staff(u))fail(403,'Messaging is unavailable.');rateLimit(u.id+':message',40);const value=text(body.body);if(!value)fail(400,'Write something first.');if(action==='notes'){run('INSERT INTO notes VALUES(?,?,?,?,?)',uid(),c.id,u.id,value,now());}else{const key=text(body.client_key,100);if(!key)fail(400,'Message key is required.');const old=one('SELECT conversation_id FROM messages WHERE sender_id=? AND client_key=?',u.id,key);if(old&&old.conversation_id!==c.id)fail(409,'Message key belongs to another conversation.');run('INSERT OR IGNORE INTO messages VALUES(?,?,?,?,?,?)',uid(),c.id,u.id,value,key,now());if(!staff(u)&&c.stage==='closed')run("UPDATE conversations SET stage='in_conversation' WHERE id=?",c.id);}return send(200,{ok:true});}
        if(req.method==='PATCH'&&!action){requireStaff(u);const stage=body.stage??c.stage;if(!['new','in_conversation','inspection','offer_application','closed'].includes(stage))fail(400,'Invalid stage.');const assigned=body.assigned_to===undefined?c.assigned_to:body.assigned_to||null;if(assigned&&!one("SELECT id FROM users WHERE id=? AND active=1 AND role IN ('staff','admin')",assigned))fail(400,'Choose an active team member.');const due=text(body.due_at??c.due_at,40);if(due&&Number.isNaN(Date.parse(due)))fail(400,'Choose a valid follow-up time.');run('UPDATE conversations SET stage=?,assigned_to=?,follow_up=?,due_at=?,blocked=? WHERE id=?',stage,assigned,text(body.follow_up??c.follow_up,300),due,body.blocked===undefined?c.blocked:Number(!!body.blocked),c.id);audit(u,'conversation_updated',c.id,{stage});return send(200,{ok:true});}
      }
      if(path==='/api/inspections' && req.method==='GET'){requireUser(u);return send(200,{inspections:all(`SELECT i.*,p.title,p.slug,p.transaction_status,s.starts_at,u.name FROM inspections i JOIN properties p ON p.id=i.property_id LEFT JOIN slots s ON s.id=i.slot_id JOIN users u ON u.id=i.customer_id ${staff(u)?'':'WHERE i.customer_id=?'} ORDER BY i.rowid DESC`,...staff(u)?[]:[u.id])});}
      if(path==='/api/inspections' && req.method==='POST'){requireUser(u);available(body.property_id);const slot=body.slot_id?one('SELECT * FROM slots WHERE id=? AND property_id=? AND cancelled=0 AND starts_at>?',body.slot_id,body.property_id,now()):null;if(body.slot_id&&!slot)fail(400,'Choose an available inspection slot.');const proposed=text(body.proposed,300);if(!slot&&!proposed)fail(400,'Choose a time or suggest an alternative.');const old=slot?one("SELECT id FROM inspections WHERE customer_id=? AND slot_id=? AND status IN ('requested','confirmed')",u.id,slot.id):null;if(old)return send(200,{id:old.id});const id=uid();run('INSERT INTO inspections(id,property_id,customer_id,slot_id,proposed,status,created_at) VALUES(?,?,?,?,?,?,?)',id,body.property_id,u.id,slot?.id||null,proposed,'requested',now());return send(201,{id});}
      const inspection=path.match(/^\/api\/inspections\/([^/]+)$/);
      if(inspection&&req.method==='PATCH'){requireUser(u);transaction(()=>{const i=one('SELECT * FROM inspections WHERE id=?',inspection[1]);if(!i||!staff(u)&&i.customer_id!==u.id)fail(404,'Inspection not found.');if(!staff(u)&&body.status!=='cancelled')fail(403,'Only staff can confirm an inspection.');const next=body.status;if(!({requested:['confirmed','cancelled'],confirmed:['completed','cancelled'],completed:[],cancelled:[]}[i.status]||[]).includes(next))fail(409,'This inspection cannot make that transition.');if(next==='confirmed'){available(i.property_id);const slot=one('SELECT * FROM slots WHERE id=? AND cancelled=0 AND starts_at>?',body.slot_id||i.slot_id||'',now());if(!slot||slot.property_id!==i.property_id)fail(400,'Choose a future inspection slot before confirming.');if(one("SELECT COUNT(*) n FROM inspections WHERE slot_id=? AND status='confirmed'",slot.id).n>=slot.capacity)fail(409,'This inspection is full. Choose another time.');if(one("SELECT id FROM inspections WHERE slot_id=? AND customer_id=? AND id<>? AND status IN ('requested','confirmed')",slot.id,i.customer_id,i.id))fail(409,'This customer already has a request for that slot.');run('UPDATE inspections SET slot_id=? WHERE id=?',slot.id,i.id);}run('UPDATE inspections SET status=?,reason=? WHERE id=?',next,text(body.reason,300),i.id);audit(u,'inspection_'+next,i.id);});return send(200,{ok:true});}
      if(path==='/api/admin/slots'&&req.method==='POST'){requireStaff(u);if(!one('SELECT id FROM properties WHERE id=?',body.property_id))fail(404,'Home not found.');if(!body.starts_at||!(Date.parse(body.starts_at)>Date.now()))fail(400,'Choose a future date and time.');const capacity=Number(body.capacity);if(!Number.isInteger(capacity)||capacity<1||capacity>100)fail(400,'Capacity must be 1–100.');run('INSERT INTO slots(id,property_id,starts_at,capacity) VALUES(?,?,?,?)',uid(),body.property_id,new Date(body.starts_at).toISOString(),capacity);return send(201,{ok:true});}
      if(path==='/api/admin/properties'&&req.method==='GET'){requireStaff(u);return send(200,{properties:all('SELECT * FROM properties ORDER BY rowid DESC').map(property)});}
      if(path==='/api/admin/properties'&&['POST','PATCH'].includes(req.method)){requireStaff(u);const existing=body.id?one('SELECT * FROM properties WHERE id=?',body.id):null;if(body.id&&!existing)fail(404,'Listing not found.');if(existing&&Number(body.version)!==existing.version)fail(409,'Another team member changed this listing. Reload before saving.');const p={...(existing?property(existing):{id:uid(),slug:uid(),title:'Untitled home',mode:'buy',property_type:'house',price_minor:0,bedrooms:0,bathrooms:0,parking:0,locality:'',summary:'',description:'',publication_state:'draft',transaction_status:'available',media:[],features:[],featured:0,available_date:''}),...body};
        if(!allowedStatus[p.mode]?.includes(p.transaction_status))fail(400,'Availability status does not match Buy / Rent.');if(!['house','apartment','townhouse'].includes(p.property_type)||!['draft','published','archived'].includes(p.publication_state))fail(400,'Invalid property type or publication state.');for(const key of ['price_minor','bedrooms','bathrooms','parking'])if(!Number.isSafeInteger(Number(p[key]))||Number(p[key])<0)fail(400,'Price and property facts must be non-negative whole numbers.');if(!Array.isArray(p.media)||p.media.length>30||p.media.some(m=>typeof m?.url!=='string'||!/^\/(assets|uploads)\/[a-zA-Z0-9_.-]+\.(webp|png|jpg)$/.test(m.url)||!existsSync(join(root,'public',m.url))||!text(m.alt,200)))fail(400,'Each photograph needs an uploaded image and descriptive alternative text.');if(!Array.isArray(p.features))fail(400,'Invalid features.');
        const publicationChanged=!existing||existing.publication_state!=='published';
        if(p.publication_state==='published') {
          if(!text(p.title)||!text(p.locality)||!text(p.description)||p.price_minor<=0||!p.media.length)fail(400,'Published listings require a title, locality, positive price, description and cover photograph.');
          if((publicationChanged||JSON.stringify(p.media)!==existing.media)&&new Set(p.media.map(m=>m.url)).size<3)fail(400,'Publishing requires at least three distinct photographs.');
        }
        transaction(()=>{const cols=['title','mode','property_type','price_minor','bedrooms','bathrooms','parking','locality','summary','description','publication_state','transaction_status','media','features','featured','available_date'];const vals=cols.map(k=>['media','features'].includes(k)?JSON.stringify(p[k]):['price_minor','bedrooms','bathrooms','parking','featured'].includes(k)?Number(p[k]):text(p[k],k==='description'?10000:500));if(existing)run(`UPDATE properties SET ${cols.map(k=>k+'=?').join(',')},version=version+1 WHERE id=?`,...vals,existing.id);else run(`INSERT INTO properties(id,slug,${cols.join(',')},created_at) VALUES(${Array(cols.length+3).fill('?').join(',')})`,p.id,text(p.title,60).toLowerCase().replace(/[^a-z0-9]+/g,'-')+'-'+p.id.slice(0,6),...vals,now());if(existing?.transaction_status!==p.transaction_status){run('UPDATE outcomes SET reversed=1 WHERE property_id=? AND reversed=0',p.id);if(['sold','leased'].includes(p.transaction_status))run('INSERT INTO outcomes VALUES(?,?,?,0,?)',uid(),p.id,p.transaction_status,now());}audit(u,'property_saved',p.id,{publication:p.publication_state,status:p.transaction_status});});return send(200,{property:property(one('SELECT * FROM properties WHERE id=?',p.id))});}
      if(path==='/api/admin/upload'&&req.method==='POST'){requireStaff(u);const data=text(body.data,7_500_000);const match=data.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);if(!match)fail(400,'Use a PNG, JPEG or WebP image.');const bytes=Buffer.from(match[2],'base64');if(bytes.length>5*1024*1024)fail(413,'Maximum image size is 5 MB.');const valid=match[1]==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):match[1]==='jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';if(!valid)fail(400,'Image contents do not match the file type.');const file=uid()+'.'+(match[1]==='jpeg'?'jpg':match[1]);mkdirSync(join(root,'public/uploads'),{recursive:true});writeFileSync(join(root,'public/uploads',file),bytes);return send(201,{url:'/uploads/'+file});}
      if(path==='/api/admin/dashboard'&&req.method==='GET'){requireStaff(u);const days=Number(q.get('days')||30);if(![7,30,90].includes(days))fail(400,'Choose a valid reporting period.');const since=new Date(Date.now()-days*86400000).toISOString();const cs=all('SELECT * FROM conversations').map(c=>threadView(c,u));const lastCustomer=c=>c.messages.at(-1)?.role==='customer';const awaiting=cs.filter(c=>!c.blocked&&c.stage!=='closed'&&lastCustomer(c));const activity=all("SELECT DISTINCT m.conversation_id,c.property_id,c.customer_id FROM messages m JOIN conversations c ON c.id=m.conversation_id JOIN users u ON u.id=m.sender_id WHERE u.role='customer' AND m.created_at>=?",since);return send(200,{days,live:one("SELECT COUNT(*) n FROM properties WHERE publication_state='published' AND transaction_status='available'").n,awaiting:awaiting.length,people:new Set(activity.map(a=>a.customer_id)).size,enquired:new Set(activity.map(a=>a.property_id)).size,new_conversations:one('SELECT COUNT(*) n FROM conversations WHERE created_at>=?',since).n,inspection_requests:one('SELECT COUNT(*) n FROM inspections WHERE created_at>=?',since).n,outcomes:one('SELECT COUNT(DISTINCT property_id) n FROM outcomes WHERE reversed=0 AND created_at>=?',since).n,overdue:cs.filter(c=>c.stage!=='closed'&&c.due_at&&c.due_at<now()).length,queue:awaiting});}
      if(path==='/api/admin/team'&&req.method==='GET'){requireStaff(u);return send(200,{users:all('SELECT id,name,email,role,active FROM users ORDER BY name')});}
      if(path==='/api/admin/team'&&req.method==='PATCH'){requireAdmin(u);if(body.id===u.id)fail(400,'You cannot change your own access.');if(!['customer','staff','admin'].includes(body.role))fail(400,'Invalid role.');if(!one('SELECT id FROM users WHERE id=?',body.id))fail(404,'Account not found.');run('UPDATE users SET role=?,active=? WHERE id=?',body.role,body.active?1:0,body.id);run('DELETE FROM sessions WHERE user_id=?',body.id);audit(u,'access_changed',body.id);return send(200,{ok:true});}
      fail(404,'Not found.');
    } catch(e) { if(!e.status) console.error(e);if(!res.headersSent)send(e.status||500,{error:e.status?e.message:'Something went wrong. Please try again.'});else res.end(); }
  });
  return { server, db };
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const host=process.env.HOST||'127.0.0.1';
  if(process.env.PORLI_DEMO!=='0'&&!['127.0.0.1','localhost','::1'].includes(host))throw new Error('Demo mode must bind to loopback only.');
  const {server}=createApp();server.listen(Number(process.env.PORT)||4173,host,()=>console.log(`Porli is ready at http://${host}:${server.address().port}`));
}
