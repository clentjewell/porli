// Presentation and motion are isolated from the marketplace's data and workflows.
export function homeView({ properties, state, esc, icon, money, price, card, empty, statusBadges, typeLabel }) {
  const homes=properties.slice().sort((a,b)=>b.featured-a.featured);
  const residentialHomes=homes.filter(p=>(p.sector||'residential')==='residential');
  const featured=homes[0];
  const real=featured?.is_demo===false;
  const views=featured?.media||[];
  const headline=state.content.headline==='Find your next place.'?'Homes to buy.<br>Property to invest in.':esc(state.content.headline);
  const intro=state.content.intro==='Residential and commercial property, with one team to talk to.'?'Browse residential and commercial property, keep a shortlist and speak directly with the team managing each listing.':state.content.intro;
  const heroInfo=featured?(real?`<div class="market-feature-info headline"><div class="eyebrow">Headline listing</div><span class="feature-price">${price(featured)}</span><h2>${esc(featured.title)}</h2><p>${esc(featured.locality)}</p>${featured.has_location?`<a class="link small view-on-map" href="/properties/${esc(featured.slug)}#location">View on map ${icon('arrow')}</a>`:''}${(featured.highlights||[]).length?`<div class="chip-row">${featured.highlights.slice(0,3).map(h=>`<span class="chip">${esc(h)}</span>`).join('')}</div>`:''}<div class="feature-actions"><a class="btn" href="/properties/${esc(featured.slug)}">View the property ${icon('arrow')}</a><a class="btn secondary" href="/properties/${esc(featured.slug)}?enquire=1">Enquire</a></div></div>`:`<a class="market-feature-info" href="/properties/${esc(featured.slug)}"><div><span class="feature-price">${money(featured)}</span><h2>${esc(featured.title)}</h2><p>${featured.bedrooms} bedrooms <span>·</span> ${featured.bathrooms} bathrooms <span>·</span> ${featured.parking} car spaces</p></div><span class="feature-open" aria-label="View property">${icon('arrow')}</span></a>`):'';
  return `<div class="market-home">
    <section class="market-intro market-width" aria-label="Find a home with Porli">
      <div class="market-intro-copy"><div class="product-label"><span></span>Residential and commercial property, with Porli</div><h1>${headline}</h1><p class="product-summary">${esc(intro)}</p>
        <form class="home-search market-search" data-form="home-search"><div class="switch" aria-label="Property search sector"><button type="button" class="${state.sector==='residential'?'selected':''}" data-action="sector" data-sector="residential" aria-pressed="${state.sector==='residential'}">Residential</button><button type="button" class="${state.sector==='commercial'?'selected':''}" data-action="sector" data-sector="commercial" aria-pressed="${state.sector==='commercial'}">Commercial</button></div><label for="home-location">Where are you looking?</label><div class="search-input">${icon('search')}<input id="home-location" name="location" aria-label="Search suburb or property" placeholder="Enter a suburb or property name" autocomplete="off"><button class="btn" aria-label="Search homes">Search ${icon('arrow')}</button></div><div class="market-locations"><span>Explore:</span><a href="/properties?sector=residential&location=Saltmere">Saltmere</a><a href="/properties?sector=residential&location=Fernwick">Fernwick</a><a href="/properties?sector=commercial&location=Thailand">Thailand</a></div></form>
        <div class="search-account-note">${icon('heart')}Save homes and manage enquiries with a free account.</div>
      </div>
      ${featured?`<div class="market-feature"><div class="market-feature-image">${views.map((m,i)=>`<img class="market-view ${i===0?'is-current':''}" src="${esc(m.url)}" alt="${esc(m.alt)}" aria-hidden="${i!==0}" data-hero-image="${i}" width="1024" height="688" ${i===0?'fetchpriority="high"':'loading="lazy"'}>`).join('')}<div class="feature-label-stack"><span class="feature-label">${esc(typeLabel(featured))} · ${esc(featured.locality)}</span>${featured.transaction_status!=='available'?statusBadges({...featured,featured:0,listed_at:''}):featured.price_label?'<span class="tag">Price on request</span>':''}</div><div class="market-view-controls" aria-label="Property photographs">${views.map((m,i)=>`<button class="${i===0?'is-current':''}" data-hero-pick="${i}" aria-label="View ${i+1} of ${esc(featured.title)}" aria-pressed="${i===0}">${i+1}</button>`).join('')}</div></div>${heroInfo}<div class="feature-disclosure">${real?'Photographs supplied by the property. Price to be confirmed.':'Fictional listing. Photographs are generated concept images.'}</div></div>`:''}
    </section>
    <section class="market-listings market-width" aria-labelledby="available-heading"><div class="market-section-title" data-reveal><div><h2 id="available-heading">Available homes</h2><p>Compare prices, property details and availability.</p></div><div class="listing-links"><a href="/properties?sector=residential">View residential ${icon('arrow')}</a><a href="/properties?sector=commercial">View commercial ${icon('arrow')}</a></div></div><div class="market-property-grid">${residentialHomes.length?residentialHomes.slice(0,3).map(p=>`<div data-reveal>${card(p)}</div>`).join(''):empty('No available homes right now.','Check back for new listings.','','')}</div></section>
    <section class="market-service"><div class="market-width service-layout"><div class="service-explanation" data-reveal><span class="product-label">What Porli does</span><h2>Find the property.<br>Talk to the people<br>who manage it.</h2><p>Porli is a residential and commercial property marketplace for buyers and investors. The Porli team publishes the listings, answers your questions and manages inspection requests.</p><a class="link" href="/about">How Porli works ${icon('arrow')}</a></div><div class="service-steps"><div data-reveal><span class="service-icon">${icon('search')}</span><div><h3>Search available properties</h3><p>Choose Residential or Commercial, then filter by location, budget and the space you need.</p></div></div><div data-reveal><span class="service-icon">${icon('heart')}</span><div><h3>Save a shortlist</h3><p>Keep the homes you're considering together in your account.</p></div></div><div data-reveal><span class="service-icon">${icon('message')}</span><div><h3>Enquire or arrange a viewing</h3><p>Message the team from a listing. Request an inspection and track its confirmation in your account.</p></div></div></div></div></section>
    <section class="market-commercial market-width" data-reveal><a class="commercial-photo" href="/properties?sector=commercial"><img src="/assets/highstreet-offices.webp" alt="Highstreet Offices, a fictional three-storey office building — generated concept image" loading="lazy" width="1024" height="688"><span>Generated concept image</span></a><div class="commercial-description"><span class="product-label">Commercial property</span><h2>Offices, retail, industrial<br>and leisure assets.</h2><p>Browse commercial listings with floor and land areas, zoning, tenancy and sale method shown clearly. Enquire from the listing when you're ready to talk.</p><a class="btn" href="/properties?sector=commercial">Browse commercial property ${icon('arrow')}</a></div></section>
    <section class="market-account market-width" data-reveal><div><h2>Your property search, in one place.</h2><p>Saved homes, conversations and inspection requests.</p></div><a class="btn secondary" href="/account/saved">Open your account ${icon('arrow')}</a></section>
  </div>`;
}

let dispose = () => {};
export function propertyGallery({p,img,esc,icon}) {
  return `<div class="gallery-main reveal ${p.media.length>=3?'detail-mosaic':''}"><button class="gallery-primary" data-action="gallery" data-index="0" aria-label="Open full gallery">${img(p,'',true)}<span class="gallery-counter" aria-hidden="true">1 / ${p.media.length}</span></button>${p.media.length>=3?`<div class="gallery-asides">${p.media.slice(1,3).map((m,i)=>`<button data-action="gallery" data-index="${i+1}" aria-label="Open gallery image ${i+2}"><img src="${esc(m.url)}" alt="${esc(m.alt)}" width="1024" height="688"></button>`).join('')}</div>`:''}<button class="btn light gallery-open" data-action="gallery">${icon('grid')}View ${p.media.length} ${p.media.length===1?'image':'images'}</button></div>`;
}
export function mountExperience() {
  dispose();
  const abort = new AbortController();
  const {signal} = abort;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('#header');
  document.body.classList.toggle('edition-front',location.pathname==='/');
  document.body.classList.toggle('edition-market',location.pathname==='/properties');
  document.body.classList.toggle('edition-property',location.pathname.startsWith('/properties/'));
  // Re-rendered account navigation keeps the same enhancement without duplicate listeners.
  if (!header.querySelector('.explore-toggle')) {
    header.querySelector('.nav-end')?.insertAdjacentHTML('beforeend','<button class="explore-toggle" aria-label="Open navigation menu" aria-expanded="false"><span></span><span></span></button>');
    header.insertAdjacentHTML('beforeend',`<div class="explore-panel" hidden><div class="explore-panel-inner"><div><span class="edition-label">Explore Porli</span><a href="/properties?sector=residential"><span>Residential property</span><span>01 ↗</span></a><a href="/properties?sector=commercial"><span>Commercial property</span><span>02 ↗</span></a><a href="/account/saved"><span>Your shortlist</span><span>03 ↗</span></a><a href="/about"><span>How Porli works</span><span>04 ↗</span></a></div><a class="menu-image" href="/properties?sector=residential"><img src="/assets/courtyard-detail.webp" alt="Explore fictional architectural homes"><span>Find your next place. ↗</span></a></div><p>Porli concept · Includes fictional homes with generated imagery</p></div><span class="reading-progress" aria-hidden="true"></span>`);
  }
  const toggle=header.querySelector('.explore-toggle'),panel=header.querySelector('.explore-panel');
  if(!panel.querySelector('.menu-account')) panel.querySelector('.explore-panel-inner>div')?.insertAdjacentHTML('beforeend','<a class="menu-account" href="/account/messages"><span>Your account</span><span>05 ↗</span></a>');
  const setMenu=open=>{panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');header.classList.toggle('menu-open',open);};
  toggle?.addEventListener('click',()=>setMenu(panel.hidden),{signal});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){setMenu(false);toggle.focus();}},{signal});
  document.addEventListener('click',event=>{if(!header.contains(event.target)&&!panel.hidden)setMenu(false);},{signal});
  header.addEventListener('focusout',()=>queueMicrotask(()=>{if(!header.contains(document.activeElement))setMenu(false);}),{signal});

  const reveals=[...document.querySelectorAll('[data-reveal]')];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('has-arrived');observer.unobserve(entry.target);}}),{threshold:.12});
  reveals.forEach(el=>observer.observe(el));
  const picks=[...document.querySelectorAll('[data-hero-pick]')];
  const images=[...document.querySelectorAll('[data-hero-image]')];
  picks.forEach(button=>button.addEventListener('click',()=>{
    const index=button.dataset.heroPick;
    picks.forEach(p=>{const active=p.dataset.heroPick===index;p.classList.toggle('is-current',active);p.setAttribute('aria-pressed',String(active));});
    images.forEach(image=>{const active=image.dataset.heroImage===index;image.classList.toggle('is-current',active);image.setAttribute('aria-hidden',String(!active));});
  },{signal}));
  let frame=0;
  const progress=header.querySelector('.reading-progress');
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  function update(){
    frame=0;
    header.classList.toggle('is-scrolled',window.scrollY>70);
    const range=document.documentElement.scrollHeight-window.innerHeight;
    progress?.style.setProperty('transform',`scaleX(${range>0?window.scrollY/range:0})`);
  }
  window.addEventListener('scroll',schedule,{signal,passive:true});
  window.addEventListener('resize',schedule,{signal,passive:true});
  reduced.addEventListener('change',schedule,{signal});
  schedule();
  dispose=()=>{abort.abort();observer.disconnect();cancelAnimationFrame(frame);};
}
