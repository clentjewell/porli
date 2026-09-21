// Presentation and motion are isolated from the marketplace's data and workflows.

const HERO_PLACEHOLDERS = {
  residential: ['Saltmere', 'Fernwick', 'Rayong, Thailand'],
  commercial: ['Fernwick', 'Rayong, Thailand', 'Highstreet'],
};

const SALE_METHOD_PHRASES = {
  private_sale: 'Private sale',
  expressions_of_interest: 'Sale by expressions of interest',
  auction: 'Auction',
  tender: 'Tender',
  price_on_application: 'Price on application',
};

// Wraps each word of a heading in <span class="w"> so mountExperience can stagger them with --i,
// without disturbing an existing <br> (kept as its own token, never wrapped or split).
function wordStagger(html) {
  return html.split(/(<br\s*\/?>)/i).map(part => /^<br\s*\/?>$/i.test(part) ? part : part.split(' ').filter(Boolean).map(word => `<span class="w">${word}</span>`).join(' ')).join(' ');
}

const HERO_LINES = ['Property to invest in.', 'Places to belong.', 'Offices to grow into.', 'Land to build on.'];

// The last few listings this browser opened, newest first. Local storage only: no account, and
// nothing leaves the device. Any read can throw in a private window, so it fails to an empty list.
export function recentlyViewed(properties) {
  try { const ids = JSON.parse(localStorage.getItem('porli-viewed') || '[]');
    return ids.map(id => properties.find(p => p.id === id)).filter(Boolean).slice(0, 4);
  } catch { return []; }
}
export function rememberViewed(id) {
  try { const ids = JSON.parse(localStorage.getItem('porli-viewed') || '[]').filter(v => v !== id);
    localStorage.setItem('porli-viewed', JSON.stringify([id, ...ids].slice(0, 8)));
  } catch { /* private browsing, or storage disabled: remembering is a convenience, not a feature */ }
}
export function homeView({ properties, state, esc, icon, money, price, card, empty, statusBadges, typeLabel, residentialTypes = [], commercialTypes = [], options = () => '' }) {
  const homes = properties.slice().sort((a, b) => b.featured - a.featured);
  // Destination cards became profiles: what is actually listed there, counted from the same
  // listings the marketplace serves, so the numbers cannot drift from the search results.
  const profile = (location, sector) => { const rows = properties.filter(p => (p.sector || 'residential') === sector && (p.locality || '').toLowerCase().includes(location.toLowerCase()));
    if (!rows.length) return 'No listings yet';
    const priced = rows.filter(p => p.price_minor > 0).map(p => p.price_minor).sort((a, b) => a - b);
    const count = `${rows.length} ${rows.length === 1 ? 'listing' : 'listings'}`;
    if (!priced.length) return `${count} · price on request`;
    const from = money({ price_minor: priced[0], currency: rows[0].currency });
    return priced.length === rows.length && priced[0] === priced.at(-1) ? `${count} · ${from}`
      : `${count} · from ${from}`; };
  const viewed = recentlyViewed(properties);
  const featured = homes[0];
  // Everything available but the headline listing, which already has the section above it, and the
  // types actually present so a pill can never return an empty grid.
  const gridHomes = homes.filter(p => p.id !== featured?.id);
  const gridTypes = [...new Map(gridHomes.map(p => [p.property_type, typeLabel(p)])).entries()].sort((a, b) => a[1].localeCompare(b[1]));
  const real = featured?.is_demo === false;
  const views = featured?.media || [];
  const defaultHeadline = state.content.headline === 'Find your next place.';
  const headline = defaultHeadline ? `<span class="w">Homes</span> <span class="w">to</span> <span class="w">buy.</span><br><span class="w"><span class="hero-rotate" data-hero-rotate>${HERO_LINES[0]}</span></span>` : wordStagger(esc(state.content.headline));
  const intro = state.content.intro === 'Residential and commercial property, with one team to talk to.' ? 'Search, shortlist and talk directly to the team.' : state.content.intro;
  const heroChip = featured ? (featured.transaction_status !== 'available' ? statusBadges({ ...featured, featured: 0, listed_at: '' }) : '') : '';
  const carousel = featured && views.length ? `<div class="market-feature-image" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Photographs of ${esc(featured.title)}">${views.map((m, i) => `<img class="market-view ${i === 0 ? 'is-current' : ''}" src="${esc(m.url)}" alt="${esc(m.alt)}" aria-hidden="${i !== 0}" data-hero-image="${i}" width="1024" height="688" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`).join('')}<div class="feature-label-stack"><span class="feature-label">${esc(typeLabel(featured))} · ${esc(featured.locality)}</span>${heroChip}</div>${views.length > 1 ? `<div class="hero-carousel-controls"><button type="button" class="hero-nav-btn" data-action="hero-prev" aria-label="Previous photograph">${icon('chevron-left')}</button><button type="button" class="hero-nav-btn" data-action="hero-next" aria-label="Next photograph">${icon('chevron-right')}</button></div><div class="hero-meta"><span class="hero-counter" aria-hidden="true"><span data-hero-counter>1</span> / ${views.length}</span><div class="market-view-controls" aria-label="Choose a photograph">${views.map((m, i) => `<button class="${i === 0 ? 'is-current' : ''}" data-hero-pick="${i}" aria-label="Photograph ${i + 1} of ${views.length}" aria-pressed="${i === 0}"></button>`).join('')}</div></div>` : ''}<p class="sr-only" role="status" aria-live="polite" data-hero-status></p></div>` : '';
  // Headline listing facts (right column): locality, price, sale method (commercial, non-default only),
  // up to four short detail pairs, highlight chips, then the view/enquire actions. Works for the real
  // GrandBlue listing and for a fictional fallback featured listing alike, from the same fields.
  const saleMethodLine = featured && (featured.sector || 'residential') === 'commercial' && featured.sale_method && featured.sale_method !== 'private_sale' ? `<p class="headline-sale-method">${esc(SALE_METHOD_PHRASES[featured.sale_method] || SALE_METHOD_PHRASES.private_sale)}</p>` : '';
  const factPairs = featured ? (featured.details || []).filter(d => Array.isArray(d) && d.length === 2 && String(d[1]).length <= 36).slice(0, 4) : [];
  const factList = factPairs.length ? `<dl class="headline-fact-list">${factPairs.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>` : '';
  const highlightChips = featured && (featured.highlights || []).length ? `<div class="chip-row">${featured.highlights.slice(0, 4).map(h => `<span class="chip">${esc(h)}</span>`).join('')}</div>` : '';
  const mapLink = featured?.has_location ? `<a class="link small view-on-map" href="/properties/${esc(featured.slug)}#location">View on map ${icon('external')}</a>` : '';
  const headlineFacts = featured ? `<div class="headline-facts"><p class="headline-locality">${icon('pin')}${esc(featured.locality)}</p>${mapLink}<p class="headline-price">${price(featured)}</p>${saleMethodLine}${factList}${highlightChips}<div class="feature-actions"><a class="btn" href="/properties/${esc(featured.slug)}">View the property ${icon('arrow')}</a><a class="btn secondary" href="/properties/${esc(featured.slug)}?enquire=1">Enquire</a>${featured.why ? `<a class="link headline-feature-link" href="/feature/${esc(featured.slug)}">Read the feature ${icon('arrow')}</a>` : ''}</div></div>` : '';
  return `<div class="market-home">
    <section class="market-hero" aria-label="Find a home with Porli">
      <div class="hero-bg-layer" aria-hidden="true">
        <img class="hero-bg is-current" src="/assets/grand-blue-beach.webp" alt="" width="1536" height="1032" fetchpriority="high">
        <img class="hero-bg" src="/assets/grand-blue-aerial.webp" alt="" width="1536" height="1032" loading="lazy">
        <img class="hero-bg" src="/assets/grand-blue-sunset.webp" alt="" width="1536" height="1032" loading="lazy">
      </div>
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-content">
        <div class="product-label"><span></span>Residential and commercial property, with Porli</div>
        <h1 class="hero-heading">${headline}</h1>
        <p class="hero-intro">${esc(intro)}</p>
        <div class="hero-search-block">
          <form class="home-search hero-search" data-form="home-search"><div class="hero-search-row"><div class="switch switch-pill" aria-label="Property search sector"><span class="switch-thumb" aria-hidden="true"></span><button type="button" class="${state.sector === 'residential' ? 'selected' : ''}" data-action="sector" data-sector="residential" aria-pressed="${state.sector === 'residential'}">${icon('home')}Residential</button><button type="button" class="${state.sector === 'commercial' ? 'selected' : ''}" data-action="sector" data-sector="commercial" aria-pressed="${state.sector === 'commercial'}">${icon('building')}Commercial</button></div><label class="sr-only" for="home-location">Search by suburb, region or property name</label><div class="hero-search-field">${icon('search')}<input id="home-location" name="location" placeholder="Suburb or property name" autocomplete="off"></div><div class="hero-quick"><fieldset class="hero-filter-set hero-quick-set" data-sector="residential" ${state.sector === 'commercial' ? 'disabled hidden' : ''}><label class="sr-only" for="hero-type-res">Property type</label><select id="hero-type-res" name="type">${options(residentialTypes, '', 'Property type')}</select><label class="sr-only" for="hero-beds">Bedrooms</label><select id="hero-beds" name="beds">${options([['0','Studio'],['1','1+ beds'],['2','2+ beds'],['3','3+ beds'],['4','4+ beds']], '', 'Beds')}</select></fieldset><fieldset class="hero-filter-set hero-quick-set" data-sector="commercial" ${state.sector === 'commercial' ? '' : 'disabled hidden'}><label class="sr-only" for="hero-type-com">Category</label><select id="hero-type-com" name="type">${options(commercialTypes, '', 'Category')}</select><label class="sr-only" for="hero-tenancy">Tenancy</label><select id="hero-tenancy" name="tenancy">${options([['vacant','Vacant possession'],['leased','Leased investment'],['owner_occupied','Owner occupied']], '', 'Tenancy')}</select></fieldset></div><button type="button" class="hero-filter-toggle" data-action="hero-filters" aria-expanded="false" aria-controls="hero-filters">${icon('filter')}<span>Filters</span><span class="filter-count" data-filter-count hidden></span></button><button class="btn hero-search-submit" aria-label="Search homes">Search ${icon('arrow')}</button></div><div class="hero-filters" id="hero-filters" hidden><fieldset class="hero-filter-set" data-sector="residential" ${state.sector === 'commercial' ? 'disabled hidden' : ''}><label>Bathrooms<select name="baths">${options([['1','1+ bathrooms'],['2','2+ bathrooms'],['3','3+ bathrooms']], '', 'Any')}</select></label></fieldset><fieldset class="hero-filter-set" data-sector="commercial" ${state.sector === 'commercial' ? '' : 'disabled hidden'}><label>Minimum floor area (m²)<input type="number" min="0" name="min_floor" placeholder="No minimum"></label></fieldset><label>Min price (AUD)<input type="number" min="0" name="min" placeholder="No minimum"></label><label>Max price (AUD)<input type="number" min="0" name="max" placeholder="No maximum"></label><div class="hero-filter-actions"><label class="hero-filter-check"><input type="checkbox" name="pending" value="1">Include under offer</label><button type="button" class="link" data-action="hero-filters-reset">Reset</button><button class="btn small">Apply and search ${icon('arrow')}</button></div></div></form>
          <div class="market-locations"><span>Explore popular locations:</span><a href="/properties?sector=residential&location=Saltmere">Saltmere</a><a href="/properties?sector=residential&location=Fernwick">Fernwick</a><a href="/properties?sector=commercial&location=Thailand">Thailand</a></div>
        </div>
      </div>
    </section>
    ${featured ? `<section class="market-headline market-width" id="headline-listing" data-reveal aria-label="Headline listing">
      <div class="headline-panel">
        <div class="market-section-title"><div><span class="eyebrow">${esc(typeLabel(featured))} · ${esc(featured.locality)}</span><h2>${esc(featured.title)}</h2></div><a class="link" href="/properties?sector=commercial">All commercial property ${icon('arrow')}</a></div>
        <div class="headline-layout"><div class="market-feature">${carousel}</div>${headlineFacts}</div>
        ${real ? '' : '<div class="feature-disclosure headline-disclosure">Fictional listing. Photographs are generated concept images.</div>'}
      </div>
    </section>` : ''}
    <section class="market-destinations market-width" data-reveal aria-label="Featured destinations">
      <div class="market-section-title"><div><span class="eyebrow">Explore</span><h2>Featured destinations</h2></div><a class="link" href="/properties?sector=residential">View all locations ${icon('arrow')}</a></div>
      <div class="destination-grid" data-reveal-group>
        <a class="destination-card" data-reveal href="/properties?sector=residential&location=Saltmere"><img src="/assets/courtyard.webp" alt="Fictional coastal courtyard home — generated concept image" loading="lazy" width="1024" height="688"><span class="destination-scrim" aria-hidden="true"></span><span class="destination-body"><strong>Saltmere</strong><em>Coastal living, reimagined.</em><span class="destination-facts">${esc(profile('Saltmere','residential'))}</span></span><span class="destination-arrow" aria-hidden="true">${icon('external')}</span></a>
        <a class="destination-card" data-reveal href="/properties?sector=commercial&location=Fernwick"><img src="/assets/highstreet-offices.webp" alt="Fictional office building — generated concept image" loading="lazy" width="1024" height="688"><span class="destination-scrim" aria-hidden="true"></span><span class="destination-body"><strong>Fernwick</strong><em>Business. Lifestyle. Opportunity.</em><span class="destination-facts">${esc(profile('Fernwick','commercial'))}</span></span><span class="destination-arrow" aria-hidden="true">${icon('external')}</span></a>
        <a class="destination-card" data-reveal href="/properties?sector=commercial&location=Thailand"><img src="/assets/grand-blue-beach.webp" alt="GrandBlue beachfront — photograph supplied by the property" loading="lazy" width="1536" height="1032"><span class="destination-scrim" aria-hidden="true"></span><span class="destination-body"><strong>Thailand</strong><em>Extraordinary places, real opportunities.</em><span class="destination-facts">${esc(profile('Thailand','commercial'))}</span></span><span class="destination-arrow" aria-hidden="true">${icon('external')}</span></a>
      </div>
      <p class="destination-caption small muted">Saltmere and Fernwick are fictional places used for the concept.</p>
    </section>
    ${viewed.length ? `<section class="market-viewed market-width" data-reveal aria-labelledby="viewed-heading">
      <div class="market-section-title"><div><span class="eyebrow">Pick up where you left off</span><h2 id="viewed-heading">Recently viewed</h2></div></div>
      <div class="market-property-grid" data-reveal-group>${viewed.map(p => `<div data-reveal>${card(p)}</div>`).join('')}</div>
      <p class="small muted">Kept on this device only. No account, and nothing is sent to the team.</p>
    </section>` : ''}
    <section class="market-listings market-width" aria-labelledby="available-heading">
      <div class="market-section-title" data-reveal><div><h2 id="available-heading">Available properties</h2><p>Compare prices, property details and availability.</p></div><a class="link" href="/properties?sector=all">Every property ${icon('arrow')}</a></div>
      ${gridTypes.length > 1 ? `<div class="type-pills" role="group" aria-label="Filter by property type" data-reveal>
        <button type="button" class="type-pill is-on" data-action="home-type" data-type="all" aria-pressed="true">All</button>
        ${gridTypes.map(([key, label]) => `<button type="button" class="type-pill" data-action="home-type" data-type="${esc(key)}" aria-pressed="false">${esc(label)}</button>`).join('')}
      </div>` : ''}
      <div class="market-property-grid" data-type-grid data-filter="all" data-reveal-group>${gridHomes.length ? gridHomes.map(p => `<div data-reveal data-type="${esc(p.property_type)}">${card(p)}</div>`).join('') : empty('No available properties right now.', 'Check back for new listings.', '', '')}</div>
      <p class="sr-only" role="status" data-type-status></p>
    </section>
    <section class="market-service"><div class="market-width service-layout"><div class="service-explanation" data-reveal><span class="product-label">What Porli does</span><h2>Find the property.<br>Talk to the people<br>who manage it.</h2><p>Porli is a residential and commercial property marketplace for buyers and investors. The Porli team publishes the listings, answers your questions and manages inspection requests. Sale method, areas, zoning and tenancy are shown plainly on every listing.</p><div class="service-actions"><a class="btn secondary" href="/account/saved">Open your account ${icon('arrow')}</a><a class="link" href="/about">How Porli works ${icon('arrow')}</a></div></div><div class="service-steps"><div data-reveal><div class="step-head"><span class="step-number">01</span><span class="service-icon">${icon('search')}</span></div><div><h3>Search available properties</h3><p>Choose Residential or Commercial, then filter by location, budget and the space you need.</p></div></div><div data-reveal><div class="step-head"><span class="step-number">02</span><span class="service-icon">${icon('heart')}</span></div><div><h3>Save a shortlist</h3><p>Keep the homes you're considering together in your account.</p></div></div><div data-reveal><div class="step-head"><span class="step-number">03</span><span class="service-icon">${icon('message')}</span></div><div><h3>Enquire or arrange a viewing</h3><p>Message the team from a listing. Request an inspection and track its confirmation in your account.</p></div></div></div></div></section>
    <section class="market-commercial market-width" data-reveal><a class="commercial-photo" href="/properties?sector=commercial"><img src="/assets/highstreet-offices.webp" alt="Highstreet Offices, a fictional three-storey office building — generated concept image" loading="lazy" width="1024" height="688"><span>Generated concept image</span></a><div class="commercial-description"><span class="product-label">Commercial property</span><h2>Offices, retail, industrial<br>and leisure assets.</h2><p>Browse commercial listings with floor and land areas, zoning, tenancy and sale method shown clearly. Enquire from the listing when you're ready to talk.</p><a class="btn" href="/properties?sector=commercial">Browse commercial property ${icon('arrow')}</a></div></section>
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
  // The phone enquiry bar repeats the price that sits at the top of a listing, so it tucks away
  // while that price is on screen and slides back once it has scrolled past. It defaults to
  // visible in CSS and is only ever tucked by script, so a failed observer leaves it usable.
  // A gentle parallax on the hero photograph: the layer drifts at a quarter of the page's speed,
  // capped so it can never expose the bottom edge. Skipped outright under reduced motion, and
  // driven from rAF so a scroll never triggers layout.
  const heroLayer = document.querySelector('.hero-bg-layer');
  if (heroLayer && !reduced.matches) {
    let ticking = false;
    const drift = () => { ticking = false;
      const shift = Math.min(window.scrollY * 0.25, 120);
      heroLayer.style.transform = `translate3d(0,${shift}px,0)`; };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } };
    addEventListener('scroll', onScroll, { passive: true, signal });
    drift();
  }
  const enquiryBar = document.querySelector('.listing-bar');
  const priceLine = document.querySelector('.detail-top .price');
  if (enquiryBar && priceLine) {
    const tuck = new IntersectionObserver(([entry]) => enquiryBar.classList.toggle('is-tucked', entry.isIntersecting));
    tuck.observe(priceLine);
    signal.addEventListener('abort', () => tuck.disconnect());
  }
  // The full-viewport hero measures the sticky header so it fills exactly what's left of the first screen.
  const setHeaderHeight=()=>document.documentElement.style.setProperty('--header-h',`${header.offsetHeight}px`);
  setHeaderHeight();
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

  // Scroll reveal. Elements inside [data-reveal-group] get an incremental --i so grids cascade.
  document.querySelectorAll('[data-reveal-group]').forEach(group=>{
    [...group.children].filter(el=>el.hasAttribute('data-reveal')).forEach((el,i)=>el.style.setProperty('--i',i));
  });
  const reveals=[...document.querySelectorAll('[data-reveal]')];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('has-arrived');observer.unobserve(entry.target);}}),{threshold:.12});
  reveals.forEach(el=>observer.observe(el));

  // Hero heading: word-by-word rise, staggered with --i (CSS keyframes; instant under reduced motion).
  document.querySelectorAll('.hero-heading .w').forEach((el,i)=>el.style.setProperty('--i',i));

  const cleanups=[];

  // Second headline line rotates through short phrases (static under reduced motion).
  const rotate=document.querySelector('[data-hero-rotate]');
  if (rotate && !reduced.matches && HERO_LINES.length>1) {
    let line=0, swap=0;
    const rotateTimer=setInterval(()=>{
      rotate.classList.add('is-out');
      swap=setTimeout(()=>{line=(line+1)%HERO_LINES.length;rotate.textContent=HERO_LINES[line];rotate.classList.add('is-in');rotate.classList.remove('is-out');void rotate.offsetWidth;rotate.classList.remove('is-in');},360);
    },3800);
    cleanups.push(()=>{clearInterval(rotateTimer);clearTimeout(swap);});
  }

  // Hero filters: toggle the panel, swap the sector-specific fields, reset, and count active filters.
  const heroForm=document.querySelector('.hero-search');
  if (heroForm) {
    const toggleBtn=heroForm.querySelector('[data-action="hero-filters"]');
    const panel=heroForm.querySelector('.hero-filters');
    const count=heroForm.querySelector('[data-filter-count]');
    const setSets=(sector=heroForm.querySelector('.switch-pill button.selected')?.dataset.sector||'residential')=>{heroForm.querySelectorAll('.hero-filter-set').forEach(set=>{const on=set.dataset.sector===sector;set.hidden=!on;set.disabled=!on;});};
    const updateCount=()=>{const data=new FormData(heroForm);let n=0;for(const [k,v] of data) if(k!=='location'&&String(v).trim())n++;count.textContent=String(n);count.hidden=!n;};
    heroForm.addEventListener('click',event=>{
      const button=event.target.closest('[data-action]');if(!button)return;
      if(button.dataset.action==='hero-filters'){const open=panel.hidden;panel.hidden=!open;toggleBtn.setAttribute('aria-expanded',String(open));toggleBtn.classList.toggle('is-open',open);if(open)panel.querySelector('select,input')?.focus({preventScroll:true});}
      if(button.dataset.action==='hero-filters-reset'){panel.querySelectorAll('select,input').forEach(el=>{if(el.type==='checkbox')el.checked=false;else el.value='';});updateCount();}
      if(button.dataset.action==='sector'){setSets(button.dataset.sector);updateCount();}
    },{signal});
    heroForm.addEventListener('change',updateCount,{signal});heroForm.addEventListener('input',updateCount,{signal});
    setSets();
  }

  // Search placeholder gently cycles through example locations while the field is empty and unfocused.
  const searchInput=document.querySelector('#home-location');
  if (searchInput && !reduced.matches) {
    let step=0;
    const cycle=()=>{
      if (document.activeElement===searchInput || searchInput.value) return;
      const sector=document.querySelector('.switch-pill button.selected')?.dataset.sector || 'residential';
      const list=HERO_PLACEHOLDERS[sector]||HERO_PLACEHOLDERS.residential;
      step=(step+1)%list.length;
      searchInput.placeholder=`Try "${list[step]}"`;
    };
    const placeholderTimer=setInterval(cycle,2600);
    cleanups.push(()=>clearInterval(placeholderTimer));
  }

  // Hero background: three GrandBlue photographs crossfade with a slow zoom. No autoplay under reduced
  // motion or while the tab is hidden — the first photograph then simply stays put.
  const heroBgs=[...document.querySelectorAll('.hero-bg')];
  if (heroBgs.length > 1) {
    let bgIndex=0,bgTimer=0;
    const showBg=next=>{bgIndex=((next%heroBgs.length)+heroBgs.length)%heroBgs.length;heroBgs.forEach((el,i)=>el.classList.toggle('is-current',i===bgIndex));};
    const bgStop=()=>{clearInterval(bgTimer);bgTimer=0;};
    const bgStart=()=>{if(reduced.matches||document.hidden)return;bgStop();bgTimer=setInterval(()=>showBg(bgIndex+1),7000);};
    document.addEventListener('visibilitychange',()=>{document.hidden?bgStop():bgStart();},{signal});
    reduced.addEventListener('change',()=>{reduced.matches?bgStop():bgStart();},{signal});
    bgStart();
    cleanups.push(bgStop);
  }

  // Headline listing carousel: prev/next, dots, keyboard, swipe, autoplay with pause, Ken Burns and aria-live status.
  const heroFrame=document.querySelector('.market-feature-image');
  if (heroFrame) {
    const images=[...heroFrame.querySelectorAll('[data-hero-image]')];
    const dots=[...document.querySelectorAll('[data-hero-pick]')];
    const prevBtn=document.querySelector('[data-action="hero-prev"]');
    const nextBtn=document.querySelector('[data-action="hero-next"]');
    const counter=document.querySelector('[data-hero-counter]');
    const status=document.querySelector('[data-hero-status]');
    const total=images.length;
    let index=0,autoplayId=0;
    const show=(next,{announce=true}={})=>{
      index=((next%total)+total)%total;
      images.forEach((el,i)=>{const active=i===index;el.classList.toggle('is-current',active);el.setAttribute('aria-hidden',String(!active));});
      dots.forEach((el,i)=>{const active=i===index;el.classList.toggle('is-current',active);el.setAttribute('aria-pressed',String(active));});
      if (counter) counter.textContent=String(index+1);
      if (status && announce) status.textContent=`Photograph ${index+1} of ${total}: ${images[index].alt}`;
    };
    const stop=()=>{clearInterval(autoplayId);autoplayId=0;};
    const start=()=>{if(reduced.matches||total<2||document.hidden)return;stop();autoplayId=setInterval(()=>show(index+1),5000);};
    const restart=()=>{stop();start();};
    prevBtn?.addEventListener('click',()=>{show(index-1);restart();},{signal});
    nextBtn?.addEventListener('click',()=>{show(index+1);restart();},{signal});
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);restart();},{signal}));
    heroFrame.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);restart();}if(event.key==='ArrowRight'){event.preventDefault();show(index+1);restart();}},{signal});
    let touchX=null;
    heroFrame.addEventListener('pointerdown',event=>{touchX=event.clientX;},{signal});
    heroFrame.addEventListener('pointerup',event=>{if(touchX===null)return;const dx=event.clientX-touchX;touchX=null;if(Math.abs(dx)>40){dx<0?show(index+1):show(index-1);restart();}},{signal});
    heroFrame.addEventListener('pointercancel',()=>{touchX=null;},{signal});
    heroFrame.addEventListener('pointerenter',stop,{signal});
    heroFrame.addEventListener('pointerleave',start,{signal});
    heroFrame.addEventListener('focusin',stop,{signal});
    heroFrame.addEventListener('focusout',start,{signal});
    document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();},{signal});
    reduced.addEventListener('change',()=>{reduced.matches?stop():start();},{signal});
    show(0,{announce:false});
    start();
    cleanups.push(stop);
  }

  let frame=0;
  const progress=header.querySelector('.reading-progress');
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  function update(){
    frame=0;
    header.classList.toggle('is-scrolled',window.scrollY>70);
    setHeaderHeight();
    const range=document.documentElement.scrollHeight-window.innerHeight;
    progress?.style.setProperty('transform',`scaleX(${range>0?window.scrollY/range:0})`);
  }
  window.addEventListener('scroll',schedule,{signal,passive:true});
  window.addEventListener('resize',schedule,{signal,passive:true});
  reduced.addEventListener('change',schedule,{signal});
  schedule();
  dispose=()=>{abort.abort();observer.disconnect();cancelAnimationFrame(frame);cleanups.forEach(fn=>fn());};
}

// An editorial homepage: one property told properly, then the rest as rows rather than a grid.
// Served at /editorial beside the existing homepage so the two can be compared on the real site.
// Honest labelling is unchanged: fictional listings say so on every row.
export function editorialView({ lead: given, properties, esc, icon, price, typeLabel, card }) {
  const lead = given || properties.find(p => p.featured && p.is_demo === false) || properties[0];
  if (!lead) return '<div class="wrap section"><h1>Nothing is listed yet.</h1></div>';
  const rest = properties.filter(p => p.id !== lead.id);
  const shots = lead.media || [];
  const why = String(lead.why || '').split(/\n\s*\n/).filter(Boolean);
  const facts = (lead.details || []).filter(d => Array.isArray(d) && String(d[1]).length <= 40).slice(0, 4);
  const shot = (m, cls = '') => `<img class="${cls}" src="${esc(m.url)}" alt="${esc(m.alt)}" loading="lazy" width="1536" height="1032">`;
  // A photograph is named only when the listing gives it a caption. Nothing is derived from the
  // alternative text, which is written for a screen reader rather than to be read beside the image.
  const plate = (m, cls = '') => `<figure class="ed-plate ${cls}" data-reveal><span class="ed-plate-img">${shot(m)}</span>${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ''}</figure>`;
  const jump = [
    why.length ? ['#ed-why', 'The property'] : null,
    facts.length ? ['#ed-facts', 'Key facts'] : null,
    shots.length > 2 ? ['#ed-plates', 'Photographs'] : null,
    rest.length ? ['#ed-rest', 'Also with Porli'] : null,
    ['#ed-enquire', 'Enquire'],
  ].filter(Boolean);
  return `<div class="ed">
    <section class="ed-open" aria-labelledby="ed-lead">
      <div class="ed-open-media">${shots[0] ? `<img src="${esc(shots[0].url)}" alt="${esc(shots[0].alt)}" width="1536" height="1032" fetchpriority="high">` : ''}<span class="ed-scrim" aria-hidden="true"></span></div>
      <div class="ed-open-copy">
        <p class="eyebrow">${esc(typeLabel(lead))} · ${esc(lead.locality)}</p>
        <h1 id="ed-lead">${esc(lead.title)}</h1>
        <p class="ed-lede">${esc(lead.summary || '')}</p>
        <p class="ed-price">${price(lead)}</p>
        <div class="ed-actions"><a class="btn" href="/properties/${esc(lead.slug)}">View the property ${icon('arrow')}</a><a class="btn light" href="/properties/${esc(lead.slug)}?enquire=1">Enquire</a></div>
      </div>
    </section>
    <nav class="ed-jump" aria-label="On this page"><div class="ed-jump-inner">${jump.map(([href, label]) => `<a href="${href}">${esc(label)}</a>`).join('')}</div></nav>
    ${why.length ? `<section class="ed-why" id="ed-why" data-reveal><p class="eyebrow">The property</p><div class="ed-why-text"><p class="ed-why-lead">${esc(why[0])}</p>${why.slice(1, 2).map(t => `<p>${esc(t)}</p>`).join('')}</div></section>` : ''}
    ${facts.length ? `<section class="ed-facts" id="ed-facts" data-reveal aria-label="Key facts"><dl>${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>` : ''}
    ${shots.length > 2 ? `<section class="ed-plates" id="ed-plates" aria-label="Photographs of ${esc(lead.title)}">
      ${plate(shots[1], 'ed-plate-wide')}
      <div class="ed-plate-pair">${shots.slice(2, 4).map(m => plate(m)).join('')}</div>
      ${shots[4] ? plate(shots[4], 'ed-plate-wide') : ''}
    </section>` : ''}
    <section class="ed-rest" id="ed-rest" aria-labelledby="ed-rest-head">
      <div class="ed-rest-head" data-reveal><h2 id="ed-rest-head">Also with Porli</h2><a class="link" href="/properties?sector=all">Every property ${icon('arrow')}</a></div>
      ${rest.map((p, i) => `<article class="ed-row ${i % 2 ? 'is-flipped' : ''}" data-reveal>
        <div class="ed-row-figure"><a class="ed-row-media" href="/properties/${esc(p.slug)}" tabindex="-1">${p.media?.[0] ? shot(p.media[0]) : ''}</a><span class="ed-row-plate" aria-hidden="true">${esc(typeLabel(p))} · ${esc(p.locality)}</span></div>
        <div class="ed-row-copy">
          <p class="sr-only">${esc(typeLabel(p))} · ${esc(p.locality)}</p>
          <h3><a href="/properties/${esc(p.slug)}">${esc(p.title)}</a></h3>
          <p>${esc(p.summary || '')}</p>
          <p class="ed-row-price">${price(p)}</p>
          <p class="small muted">${p.is_demo === false ? '' : 'Fictional listing · Generated image'}</p>
        </div>
      </article>`).join('')}
    </section>
    <section class="ed-close" id="ed-enquire" data-reveal><h2>Talk to the people who manage it.</h2><p>Enquire from any listing and the team replies in your account.</p><a class="btn" href="/properties/${esc(lead.slug)}?enquire=1">Enquire about ${esc(lead.title)} ${icon('arrow')}</a></section>
  </div>`;
}
