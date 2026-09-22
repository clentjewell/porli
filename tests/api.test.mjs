import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { rmSync } from 'node:fs';
import { createApp } from '../server.mjs';

// Set PORLI_TEST_BASE (for example http://localhost:8788 from `npm run cf:dev`) to run
// the same suite against the Cloudflare Worker. Each test then uses an isolated database.
const remote = process.env.PORLI_TEST_BASE?.replace(/\/$/, '');

async function fixture(t) {
  let app=null,base=remote;
  if(!remote){
    app=createApp({dbPath:':memory:',demo:true});
    await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
    t.after(async()=>{await new Promise(resolve=>app.server.close(resolve));app.db.close();});
    base='http://127.0.0.1:'+app.server.address().port;
  }
  const database='test-'+randomUUID();
  function client() {let cookie='';return async(path,method='GET',body,headers={})=>{const res=await fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json',Cookie:cookie,'X-Porli-Database':database,...headers},body:body===undefined?undefined:JSON.stringify(body)});if(res.headers.get('set-cookie'))cookie=res.headers.get('set-cookie').split(';')[0];return{status:res.status,data:await res.json()};};}
  const customer=client(),other=client(),staff=client(),admin=client(),visitor=client();
  for(const[c,role]of[[customer,'customer'],[other,'other'],[staff,'staff'],[admin,'admin']])assert.equal((await c('/auth/demo','POST',{role})).status,200);
  return{db:app?.db??null,base,customer,other,staff,admin,visitor,client};
}
test('public catalogue separates sector, availability and private drafts',async t=>{const{visitor,staff}=await fixture(t);const residential=await visitor('/properties');assert.equal(residential.data.properties.length,3);assert.ok(residential.data.properties.every(p=>p.sector==='residential'));assert.deepEqual(residential.data.properties.map(p=>p.title).sort(),['Courtyard House','Garden Apartment','Veranda House']);const commercial=await visitor('/properties?sector=commercial');assert.equal(commercial.data.properties.length,3);assert.ok(commercial.data.properties.every(p=>p.sector==='commercial'));assert.ok(commercial.data.properties.some(p=>p.id==='grand-blue-hotel'));assert.ok(commercial.data.properties.some(p=>p.id==='demo-commercial-01'));assert.ok(commercial.data.properties.some(p=>p.id==='demo-commercial-02'));assert.equal((await visitor('/properties?sector=all')).data.properties.length,6);assert.equal((await visitor('/properties?sector=residential&pending=1')).data.properties.length,4);assert.equal((await visitor('/properties/garden-cottage')).status,404);assert.equal((await visitor('/properties/balcony-apartment')).status,404);assert.equal((await staff('/properties/garden-cottage')).status,200);assert.equal((await visitor('/properties?location=nowhere')).data.total,0);assert.equal((await visitor('/properties?min=-10')).status,400);assert.equal((await visitor('/admin/properties')).status,401);assert.equal((await visitor('/properties?sector=lettings')).status,400);});
test('saves are idempotent, persistent and scoped to current account',async t=>{const{customer,other,visitor}=await fixture(t);const body={property_id:'demo-property-01'};assert.equal((await visitor('/saves','POST',body)).status,401);await customer('/saves','POST',body);await customer('/saves','POST',body);assert.deepEqual((await customer('/saves')).data.ids,[body.property_id]);assert.deepEqual((await other('/saves')).data.ids,[]);await customer('/saves','DELETE',body);assert.deepEqual((await customer('/saves')).data.ids,[]);});
test('message retries reuse one thread and other accounts cannot read it',async t=>{const{customer,other,staff}=await fixture(t);const body={property_id:'demo-property-01',body:'Is there afternoon sun?',client_key:'retry-1'};const a=await customer('/conversations','POST',body),b=await customer('/conversations','POST',body);assert.equal(a.data.id,b.data.id);assert.equal((await customer('/conversations/'+a.data.id)).data.messages.length,1);assert.equal((await other('/conversations/'+a.data.id)).status,404);assert.equal((await other('/conversations/'+a.data.id+'/messages','POST',{body:'unauthorised',client_key:'hack'})).status,404);assert.equal((await staff('/conversations/'+a.data.id+'/messages','POST',{body:'Yes, it does.',client_key:'staff-1'})).status,200);assert.equal((await customer('/conversations/'+a.data.id)).data.messages.length,2);});
test('notes never reach customer responses and reading or noting is not replying',async t=>{const{customer,staff}=await fixture(t);const{id}= (await customer('/conversations','POST',{property_id:'demo-property-01',body:'Hello team',client_key:'m1'})).data;assert.equal((await staff('/admin/dashboard')).data.awaiting,1);await staff(`/conversations/${id}/read`,'POST',{});await staff(`/conversations/${id}/notes`,'POST',{body:'PRIVATE NOTE'});assert.equal((await staff('/admin/dashboard')).data.awaiting,1);const view=await customer('/conversations/'+id);assert.equal(view.data.notes,undefined);assert.ok(!JSON.stringify(view).includes('PRIVATE NOTE'));assert.equal((await customer(`/conversations/${id}/notes`,'POST',{body:'forged'})).status,403);await staff(`/conversations/${id}/messages`,'POST',{body:'A human reply',client_key:'reply1'});assert.equal((await staff('/admin/dashboard')).data.awaiting,0);});
test('metrics count people and property threads, never message volume',async t=>{const{customer,staff}=await fixture(t);for(let i=0;i<5;i++)await customer('/conversations','POST',{property_id:i<3?'demo-property-01':'demo-property-02',body:'Question '+i,client_key:'metric-'+i});const d=(await staff('/admin/dashboard')).data;assert.equal(d.people,1);assert.equal(d.enquired,2);assert.equal(d.new_conversations,2);});
test('inspection confirmation enforces capacity atomically and requests are not bookings',async t=>{const{customer,other,staff}=await fixture(t);const starts_at=new Date(Date.now()+5*86400000).toISOString();assert.equal((await staff('/admin/slots','POST',{property_id:'demo-property-01',starts_at,capacity:1})).status,201);const slot=(await customer('/properties/courtyard-house')).data.slots.find(s=>s.capacity===1);const payload={property_id:'demo-property-01',slot_id:slot.id};const a=(await customer('/inspections','POST',payload)).data.id,b=(await other('/inspections','POST',payload)).data.id;assert.equal((await customer('/inspections','POST',payload)).data.id,a);assert.equal((await customer('/inspections')).data.inspections[0].status,'requested');assert.equal((await customer('/inspections/'+a,'PATCH',{status:'confirmed'})).status,403);const results=await Promise.all([staff('/inspections/'+a,'PATCH',{status:'confirmed'}),staff('/inspections/'+b,'PATCH',{status:'confirmed'})]);assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);assert.equal((await other('/inspections/'+a,'PATCH',{status:'cancelled'})).status,404);});
test('closed enquiry does not sell property and new customer messages reopen it',async t=>{const{customer,staff}=await fixture(t);const{id}=(await customer('/conversations','POST',{property_id:'demo-property-01',body:'Hello',client_key:'open-1'})).data;await staff('/conversations/'+id,'PATCH',{stage:'closed'});assert.equal((await customer('/properties/courtyard-house')).data.property.transaction_status,'available');await customer('/conversations/'+id+'/messages','POST',{body:'Another question',client_key:'open-2'});assert.equal((await staff('/conversations/'+id)).data.stage,'in_conversation');});
test('publication validation, revision conflicts and outcome reversals',async t=>{const{staff,visitor,db}=await fixture(t);let draft=(await staff('/properties/garden-cottage')).data.property;assert.equal((await staff('/admin/properties','PATCH',{...draft,publication_state:'published'})).status,400);let p=(await staff('/properties/courtyard-house')).data.property;assert.equal((await staff('/admin/properties','PATCH',{...p,transaction_status:'leased'})).status,400);assert.equal((await staff('/admin/properties','PATCH',{...p,title:'Updated courtyard'})).status,200);assert.equal((await staff('/admin/properties','PATCH',{...p,title:'Stale overwrite'})).status,409);p=(await staff('/properties/courtyard-house')).data.property;assert.equal((await staff('/admin/properties','PATCH',{...p,transaction_status:'sold'})).status,200);assert.equal((await staff('/admin/dashboard')).data.outcomes,1);assert.equal((await visitor('/properties')).data.total,2);p=(await staff('/properties/courtyard-house')).data.property;await staff('/admin/properties','PATCH',{...p,transaction_status:'available'});assert.equal((await staff('/admin/dashboard')).data.outcomes,0);if(db)assert.equal(db.prepare('SELECT COUNT(*) n FROM audit').get().n,3);});
test('terminal properties block new enquiries and inspections but retain conversations',async t=>{const{customer,other,staff}=await fixture(t);const{id}=(await customer('/conversations','POST',{property_id:'demo-property-02',body:'Hello',client_key:'terminal1'})).data;let p=(await staff('/properties/garden-apartment')).data.property;await staff('/admin/properties','PATCH',{...p,transaction_status:'sold'});assert.equal((await other('/conversations','POST',{property_id:p.id,body:'new',client_key:'terminal2'})).status,409);assert.equal((await other('/inspections','POST',{property_id:p.id,proposed:'tomorrow'})).status,409);assert.equal((await customer('/conversations/'+id)).status,200);});
test('deactivation removes privileges immediately, customers cannot grant roles',async t=>{const{staff,admin,customer}=await fixture(t);assert.equal((await customer('/profile','PATCH',{name:'Alex',role:'admin'})).data.user.role,'customer');assert.equal((await customer('/admin/team','PATCH',{id:'demo-other',role:'admin',active:true})).status,403);assert.equal((await admin('/admin/team','PATCH',{id:'demo-staff',role:'staff',active:false})).status,200);assert.equal((await staff('/admin/properties')).status,401);});
test('password registration, logout, origin checks and upload rejection',async t=>{const{client,visitor,staff}=await fixture(t);const person=client();assert.equal((await person('/auth/register','POST',{name:'Test Person',email:'test@example.test',password:'A fictional passphrase 123'})).status,201);assert.equal((await person('/session')).data.user.role,'customer');await person('/auth/logout','POST',{});assert.equal((await person('/session')).data.user,null);assert.equal((await person('/auth/login','POST',{email:'test@example.test',password:'wrong'})).status,401);assert.equal((await person('/auth/login','POST',{email:'test@example.test',password:'A fictional passphrase 123'})).status,200);assert.equal((await visitor('/auth/demo','POST',{role:'admin'},{Origin:'https://evil.example'})).status,403);assert.equal((await staff('/admin/upload','POST',{data:'data:image/svg+xml;base64,PHN2Zz4='})).status,400);assert.equal((await staff('/admin/upload','POST',{data:'data:image/png;base64,ZmFrZQ=='})).status,400);});
test('the Grand Blue Hotel headline listing is real, commercial, priced on application and sorts last',async t=>{const{visitor}=await fixture(t);const commercial=await visitor('/properties?sector=commercial');const hotel=commercial.data.properties.find(p=>p.id==='grand-blue-hotel');assert.ok(hotel);assert.equal(hotel.is_demo,false);assert.equal(hotel.price_label,'Price to be confirmed');assert.equal(hotel.currency,'THB');assert.equal(hotel.sector,'commercial');assert.equal(hotel.sale_method,'expressions_of_interest');const asc=(await visitor('/properties?sector=commercial&sort=price-asc')).data.properties;assert.equal(asc.at(-1).id,'grand-blue-hotel');const desc=(await visitor('/properties?sector=commercial&sort=price-desc')).data.properties;assert.equal(desc.at(-1).id,'grand-blue-hotel');assert.ok(!(await visitor('/properties?sector=commercial&min=1')).data.properties.some(p=>p.id==='grand-blue-hotel'));});
test('publishing without a price requires a price label, and property type, sector and currency are validated',async t=>{const{staff}=await fixture(t);const media=[{url:'/assets/courtyard.webp',alt:'A'},{url:'/assets/apartment.webp',alt:'B'},{url:'/assets/townhouse.webp',alt:'C'}];const base={title:'Test Listing',sector:'commercial',property_type:'hotel',price_minor:0,sale_method:'expressions_of_interest',floor_area:0,land_area:0,zoning:'',tenancy:'',bedrooms:0,bathrooms:0,parking:0,locality:'Nowhere',summary:'Summary',description:'Description text.',publication_state:'published',transaction_status:'available',media,features:[]};assert.equal((await staff('/admin/properties','POST',{...base,price_label:''})).status,400);const created=await staff('/admin/properties','POST',{...base,price_label:'Price to be confirmed'});assert.equal(created.status,200);assert.equal(created.data.property.price_label,'Price to be confirmed');assert.equal((await staff('/admin/properties','POST',{...base,price_label:'x',property_type:'castle'})).status,400);assert.equal((await staff('/admin/properties','POST',{...base,price_label:'x',currency:'EUR'})).status,400);assert.equal((await staff('/admin/properties','POST',{...base,price_label:'x',sector:'residential'})).status,400);});
test('the hotel listing page returns its details and highlights arrays',async t=>{const{visitor}=await fixture(t);const res=await visitor('/properties/grand-blue-hotel-thailand');assert.equal(res.status,200);assert.ok(Array.isArray(res.data.property.details)&&res.data.property.details.length>0);assert.ok(Array.isArray(res.data.property.highlights)&&res.data.property.highlights.length>0);assert.ok(res.data.property.details.every(d=>Array.isArray(d)&&d.length===2));});
test('property type must match the listing sector',async t=>{const{staff}=await fixture(t);const base={title:'Mismatch test',price_minor:0,price_label:'TBC',currency:'AUD',bedrooms:0,bathrooms:0,parking:0,locality:'Nowhere',summary:'S',description:'D',publication_state:'draft',transaction_status:'available',media:[],features:[],details:[],highlights:[],sale_method:'private_sale',floor_area:0,land_area:0,zoning:'',tenancy:''};assert.equal((await staff('/admin/properties','POST',{...base,sector:'residential',property_type:'office'})).status,400);assert.equal((await staff('/admin/properties','POST',{...base,sector:'commercial',property_type:'house'})).status,400);assert.equal((await staff('/admin/properties','POST',{...base,sector:'residential',property_type:'house'})).status,200);assert.equal((await staff('/admin/properties','POST',{...base,sector:'commercial',property_type:'office'})).status,200);});
test('sale method and tenancy are validated against their allow-lists',async t=>{const{staff}=await fixture(t);const base={title:'Validation test',sector:'commercial',property_type:'office',price_minor:0,price_label:'TBC',currency:'AUD',bedrooms:0,bathrooms:0,parking:0,locality:'Nowhere',summary:'S',description:'D',publication_state:'draft',transaction_status:'available',media:[],features:[],details:[],highlights:[],floor_area:0,land_area:0,zoning:''};assert.equal((await staff('/admin/properties','POST',{...base,sale_method:'best_offer',tenancy:''})).status,400);assert.equal((await staff('/admin/properties','POST',{...base,sale_method:'auction',tenancy:'squatting'})).status,400);const ok=await staff('/admin/properties','POST',{...base,sale_method:'tender',tenancy:'leased'});assert.equal(ok.status,200);assert.equal(ok.data.property.sale_method,'tender');assert.equal(ok.data.property.tenancy,'leased');});
test('serialised properties never expose mode or rent_frequency',async t=>{const{visitor}=await fixture(t);const list=(await visitor('/properties?sector=all')).data.properties;assert.ok(list.length>0);for(const p of list){assert.ok(!('mode' in p));assert.ok(!('rent_frequency' in p));assert.ok('sector' in p);assert.ok('sale_method' in p);assert.ok('floor_area' in p);assert.ok('land_area' in p);assert.ok('zoning' in p);assert.ok('tenancy' in p);}const detail=(await visitor('/properties/grand-blue-hotel-thailand')).data.property;assert.ok(!('mode' in detail));assert.ok(!('rent_frequency' in detail));});
test('listing pages expose location fields; the hotel is geocoded and fictional homes are not',async t=>{const{visitor}=await fixture(t);const hotel=(await visitor('/properties/grand-blue-hotel-thailand')).data.property;assert.equal(hotel.has_location,true);assert.equal(hotel.address_display,'full');assert.ok(hotel.address.length>0);assert.equal(hotel.latitude,12.6523552);assert.equal(hotel.longitude,101.6108262);assert.ok(hotel.directions.length>0);const fictional=(await visitor('/properties/courtyard-house')).data.property;assert.equal(fictional.has_location,false);assert.equal(fictional.address_display,'locality_only');assert.equal(fictional.latitude,0);assert.equal(fictional.longitude,0);assert.equal(fictional.address,'');});
test('saving coordinates requires both values within range and round-trips a valid pair',async t=>{const{staff}=await fixture(t);const p=(await staff('/properties/courtyard-house')).data.property;assert.equal((await staff('/admin/properties','PATCH',{...p,latitude:12.5,longitude:0})).status,400);assert.equal((await staff('/admin/properties','PATCH',{...p,latitude:95,longitude:100})).status,400);const ok=await staff('/admin/properties','PATCH',{...p,latitude:12.5,longitude:101.5,address:'1 Test Street, Testville',directions:'Turn left at the corner.'});assert.equal(ok.status,200);assert.equal(ok.data.property.latitude,12.5);assert.equal(ok.data.property.longitude,101.5);assert.equal(ok.data.property.has_location,true);assert.equal(ok.data.property.address,'1 Test Street, Testville');assert.equal(ok.data.property.address_display,'full');assert.equal(ok.data.property.directions,'Turn left at the corner.');});
test('/api/session exposes the maps embed key configuration',async t=>{const{visitor}=await fixture(t);assert.equal((await visitor('/session')).data.maps_embed_key,'');});
test('security headers allow the Google Maps embed frame',async t=>{const{base}=await fixture(t);const res=await fetch(base+'/api/session');assert.ok(res.headers.get('content-security-policy').includes('frame-src https://www.google.com'));});
test('the hotel carries a Why paragraph and grouped features, sourced from the property',async t=>{const{visitor}=await fixture(t);const p=(await visitor('/properties/grand-blue-hotel-thailand')).data.property;assert.ok(p.why.length>0);assert.ok(/Mae Phim Beach/.test(p.why));assert.ok(!/\$|\bTHB\b|\bbaht\b/i.test(p.why),'the Why paragraph must never state a price');assert.ok(Array.isArray(p.feature_groups)&&p.feature_groups.length>0);assert.ok(p.feature_groups.every(g=>Array.isArray(g)&&g.length===2&&typeof g[0]==='string'&&Array.isArray(g[1])));const grouped=p.feature_groups.flatMap(([,items])=>items);assert.deepEqual([...grouped].sort(),[...p.features].sort(),'every flat feature belongs to exactly one group');});

test('why, feature groups and documents round-trip and reject malformed input',async t=>{const{staff}=await fixture(t);const p=(await staff('/properties/courtyard-house')).data.property;
  assert.equal((await staff('/admin/properties','PATCH',{...p,feature_groups:['Outdoor']})).status,400);
  assert.equal((await staff('/admin/properties','PATCH',{...p,feature_groups:[['Outdoor','Pool']]})).status,400);
  assert.equal((await staff('/admin/properties','PATCH',{...p,documents:[['Floor plan','javascript:alert(1)']]})).status,400);
  assert.equal((await staff('/admin/properties','PATCH',{...p,documents:[['Floor plan','/uploads/../secret.pdf']]})).status,400);
  const ok=await staff('/admin/properties','PATCH',{...p,why:'A sourced paragraph.',feature_groups:[['Outdoor',['Courtyard','Veranda']]],documents:[['Floor plan','https://example.com/plan.pdf']]});
  assert.equal(ok.status,200);assert.equal(ok.data.property.why,'A sourced paragraph.');
  assert.deepEqual(ok.data.property.feature_groups,[['Outdoor',['Courtyard','Veranda']]]);
  assert.deepEqual(ok.data.property.documents,[['Floor plan','https://example.com/plan.pdf']]);});

test('Featured is a named sort the visitor can turn off, not a hidden override',async t=>{const{visitor}=await fixture(t);
  const def=(await visitor('/properties?sector=commercial')).data.properties;
  assert.equal(def[0].slug,'grand-blue-hotel-thailand','the one sellable listing leads by default');
  assert.equal(def[0].featured,1);assert.equal(def[0].is_demo,false);
  const featured=(await visitor('/properties?sector=commercial&sort=featured')).data.properties;
  assert.deepEqual(featured.map(p=>p.slug),def.map(p=>p.slug),'the default is the Featured sort, named');
  // Choosing any other sort turns Featured off completely rather than quietly reordering on top.
  const newest=(await visitor('/properties?sector=commercial&sort=newest')).data.properties;
  assert.notEqual(newest[0].slug,'grand-blue-hotel-thailand','newest must not be overridden by Featured');
  const asc=(await visitor('/properties?sector=commercial&sort=price-asc')).data.properties;
  assert.equal(asc.at(-1).slug,'grand-blue-hotel-thailand','a price label still sorts last (docs/18)');
  const prices=asc.filter(p=>p.price_minor>0).map(p=>p.price_minor);
  assert.deepEqual(prices,[...prices].sort((a,b)=>a-b));
  // An unknown sort falls back to the default rather than erroring or returning an odd order.
  const junk=(await visitor('/properties?sector=commercial&sort=nonsense')).data.properties;
  assert.deepEqual(junk.map(p=>p.slug),def.map(p=>p.slug));
  // Every sort returns the same listings; sorting reorders, it never filters.
  for(const rows of [featured,newest,asc,junk]){assert.equal(rows.length,def.length);
    assert.deepEqual([...rows.map(p=>p.slug)].sort(),[...def.map(p=>p.slug)].sort());}});

test('listing cards receive every photograph they carry, for the card carousel',async t=>{const{visitor}=await fixture(t);
  const list=(await visitor('/properties?sector=commercial')).data.properties;
  const hotel=list.find(p=>p.slug==='grand-blue-hotel-thailand');
  assert.equal(hotel.media.length,6);
  assert.ok(hotel.media.every(m=>m.url&&m.alt),'every card photograph needs alternative text');});

test('every listing image says where the picture came from',async t=>{const{visitor}=await fixture(t);
  const list=(await visitor('/properties?sector=all')).data.properties;
  const detail=(await visitor('/properties/grand-blue-hotel-thailand')).data.property;
  let checked=0;
  for(const p of [...list,detail]){assert.ok(p.media.length>0,p.slug+' has no imagery');
    for(const m of p.media){checked++;
      assert.ok(m.alt&&m.alt.length>10,`${p.slug}: alt text is missing or too short`);
      const want=p.is_demo?'Generated concept image.':'Photograph supplied by the property.';
      assert.ok(m.alt.includes(want),`${p.slug}: alt text must state its source, got ${JSON.stringify(m.alt)}`);
      // A real photograph must never be described as generated, or the other way round.
      const wrong=p.is_demo?'Photograph supplied by the property.':'Generated concept image.';
      assert.ok(!m.alt.includes(wrong),`${p.slug}: alt text claims the wrong source`);}}
  assert.ok(checked>=13,'expected every seeded image to be checked');});

test('the source sentence is added once, however many times the app starts',{skip:!!remote},async()=>{
  const path=join(tmpdir(),'porli-alt-'+randomUUID()+'.sqlite');
  try{
    let app=createApp({dbPath:path,demo:false,seed:true});
    const first=JSON.parse(app.db.prepare("SELECT media FROM properties WHERE id='grand-blue-hotel'").get().media);
    app.db.close();
    app=createApp({dbPath:path,demo:false,seed:true});
    const second=JSON.parse(app.db.prepare("SELECT media FROM properties WHERE id='grand-blue-hotel'").get().media);
    app.db.close();
    assert.deepEqual(second,first,'a second start must not append the sentence again');
    assert.equal(second[0].alt.split('Photograph supplied by the property.').length-1,1);
  } finally { rmSync(path,{force:true}); rmSync(path+'-wal',{force:true}); rmSync(path+'-shm',{force:true}); }});

test('legacy rent rows migrate to buy on every start, idempotently',{skip:!!remote},async()=>{
  const path=join(tmpdir(),'porli-test-'+randomUUID()+'.sqlite');
  try{
    let app=createApp({dbPath:path,demo:false,seed:true});
    app.db.close();
    const raw=new DatabaseSync(path);
    raw.exec("INSERT INTO properties (id,slug,title,mode,property_type,price_minor,bedrooms,bathrooms,parking,locality,summary,description,publication_state,transaction_status,media,features,created_at) VALUES ('legacy-rent-1','legacy-rent-1','Legacy Rental','rent','apartment',50000,2,1,1,'Nowhere','A legacy rent listing.','Description.','published','leased','[]','[]','2020-01-01T00:00:00.000Z')");
    raw.close();
    app=createApp({dbPath:path,demo:false,seed:true});
    let row=app.db.prepare("SELECT * FROM properties WHERE id='legacy-rent-1'").get();
    assert.equal(row.mode,'buy');
    assert.equal(row.transaction_status,'sold');
    assert.equal(row.price_label,'Price to be confirmed');
    assert.equal(row.available_date,'');
    app.db.close();
    app=createApp({dbPath:path,demo:false,seed:true});
    const row2=app.db.prepare("SELECT * FROM properties WHERE id='legacy-rent-1'").get();
    assert.deepEqual(row2,row);
    await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
    try{
      const base='http://127.0.0.1:'+app.server.address().port;
      const res=await fetch(base+'/api/properties?sector=residential');
      const data=await res.json();
      assert.ok(!data.properties.some(p=>p.id==='legacy-rent-1'));
    } finally {
      await new Promise(resolve=>app.server.close(resolve));
    }
    app.db.close();
  } finally {
    for(const suffix of ['','-wal','-shm'])try{rmSync(path+suffix);}catch{}
  }
});

test('first-run setup creates the first administrator once, and passwords can be changed',{skip:!!remote},async t=>{
  const app=createApp({dbPath:':memory:',demo:false,seed:true});
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  t.after(async()=>{await new Promise(resolve=>app.server.close(resolve));app.db.close();});
  const base='http://127.0.0.1:'+app.server.address().port;
  const client=()=>{let cookie='';return async(path,method='GET',body)=>{const res=await fetch(base+'/api'+path,{method,headers:{'Content-Type':'application/json',Cookie:cookie},body:body===undefined?undefined:JSON.stringify(body)});const set=res.headers.get('set-cookie');if(set)cookie=set.split(';')[0];return {status:res.status,body:await res.json()};};};
  const first=client(),second=client(),late=client();
  assert.equal((await first('/setup')).body.needed,true,'a fresh public host has no team account');
  assert.equal((await first('/setup','POST',{name:'Lead',email:'lead@example.com',password:'short'})).status,400);
  const made=await first('/setup','POST',{name:'Lead',email:'lead@example.com',password:'first-password-12'});
  assert.equal(made.status,201);assert.equal(made.body.user.role,'admin');
  assert.equal((await late('/setup')).body.needed,false,'the door closes once an administrator exists');
  assert.equal((await late('/setup','POST',{name:'Intruder',email:'x@example.com',password:'another-password-12'})).status,409);
  assert.equal((await first('/admin/dashboard?days=30')).status,200,'the new administrator can use the workspace');
  assert.equal((await second('/auth/login','POST',{email:'lead@example.com',password:'first-password-12'})).status,200);
  assert.equal((await first('/profile/password','PATCH',{current:'wrong-password-12',next:'second-password-12'})).status,401);
  assert.equal((await first('/profile/password','PATCH',{current:'first-password-12',next:'tiny'})).status,400);
  assert.equal((await first('/profile/password','PATCH',{current:'first-password-12',next:'second-password-12'})).status,200);
  assert.equal((await second('/session')).body.user,null,'other sessions end when the password changes');
  assert.equal((await first('/session')).body.user.role,'admin','the session that changed it stays');
  assert.equal((await late('/auth/login','POST',{email:'lead@example.com',password:'first-password-12'})).status,401);
  assert.equal((await late('/auth/login','POST',{email:'lead@example.com',password:'second-password-12'})).status,200);
});
