// Overview tab
document.getElementById('overview').innerHTML = `
<h1>1244 Hadaway Ct NE</h1>
<p class="sub">Lawrenceville, GA 30043 · ${P.mls ? 'MLS #'+P.mls : ''} · ${P.status} · ${P.dom} days on market</p>
<p><a href="https://www.zillow.com/homedetails/1244-Hadaway-Ct-Lawrenceville-GA-30043/14802515_zpid" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:#fff;border-radius:980px;padding:8px 18px;font-size:14px;font-weight:600;text-decoration:none;box-shadow:0 2px 8px rgba(0,113,227,.35)">View on Zillow ↗</a></p>

<div class="grid g3">
  <div class="card"><h3>List Price</h3><div class="big">${fmt(P.price)}</div><p class="note">Cut ${fmt(P.price_cut.amount)} on ${P.price_cut.date} (was ${fmt(P.price_cut.prior_price)})</p></div>
  <div class="card"><h3>Zestimate</h3><div class="big">${fmt(P.zestimate)}</div><p class="note">Range ${fmt(P.zestimate_range[0])} to ${fmt(P.zestimate_range[1])}</p></div>
  <div class="card"><h3>Dom</h3><div class="big orange">${P.dom}</div><p class="note">${P.views} views · ${P.saves} saves</p></div>
</div>

<div class="grid g2">
  <div class="card"><h3>Facts</h3><table>
    <tr><td>Beds / Baths</td><td><b>${P.beds} / ${P.baths}</b></td></tr>
    <tr><td>Square Feet</td><td><b>${Number(P.sqft).toLocaleString()}</b> (${fmt(P.ppsf)}/sqft)</td></tr>
    <tr><td>Lot</td><td>${P.lot_acres} acres · cul-de-sac</td></tr>
    <tr><td>Year Built</td><td>${P.year_built}</td></tr>
    <tr><td>HOA</td><td>${fmt(P.hoa_annual)}/yr</td></tr>
    <tr><td>Annual Tax</td><td>${fmt(P.annual_tax)} (assessed ${fmt(P.tax_assessed)})</td></tr>
    <tr><td>Rent Zestimate</td><td>${fmt(P.rent_zestimate)}/mo</td></tr>
    <tr><td>Condition</td><td><span class="pill p-o">${P.special_conditions}</span></td></tr>
  </table></div>
  <div class="card"><h3>Features</h3><div>${P.features.map(f=>`<span class="tag">${f}</span>`).join('')}</div>
    <h3 style="margin-top:20px">Comps</h3><table>
    <tr><th>Address</th><th>Price</th><th>Bd/Ba</th><th>Sqft</th></tr>
    ${P.comps.map(c=>`<tr><td>${c.addr}</td><td><b>${fmt(c.price)}</b></td><td>${c.beds}/${c.baths}</td><td>${c.sqft}</td></tr>`).join('')}
    </table></div>
</div>`;

// Finance tab
document.getElementById('finance').innerHTML = `
<h1>Owner-Finance Model</h1>
<p class="sub">${F.assumptions.note_rate_pct}% fixed · ${F.assumptions.term_years}-yr amortization · ${F.assumptions.balloon_year}-yr balloon · payment excludes tax & insurance</p>
<div class="grid g2">
<div class="card"><h3>Scenarios</h3><table>
<tr><th>Down</th><th>Note</th><th>Monthly P&I</th><th>5-yr Balloon</th><th>Interest (5y)</th></tr>
${F.scenarios.map(s=>`<tr><td><b>${fmt(s.down)}</b></td><td>${fmt(s.note)}</td><td class="green"><b>${fmt(Math.round(s.monthly_piti_excl_tax_ins))}</b>/mo</td><td>${fmt(Math.round(s.balloon_5yr))}</td><td>${fmt(Math.round(s.total_interest_5yr))}</td></tr>`).join('')}
</table><p class="note">Better credit = lower down. The down-payment flexibility is the product being sold.</p></div>

<div class="card"><h3>Buyer Personas</h3>
${PS.map(p=>`<details><summary>${p.name}</summary><p><b>Pain:</b> ${p.pain}<br><b>Hook:</b> ${p.hook}<br><b>Channel:</b> ${p.channel}</p></details>`).join('')}
</div>
</div>

<div class="card" style="margin-top:16px"><h3>Price Strategy</h3>
<p><span style="font-weight:600">Pain:</span> ${C.price_strategy.issue}</p>
<p style="font-size:14px;line-height:1.6;margin-top:10px"><span class="green" style="font-weight:600">Recommendation:</span> ${C.price_strategy.recommendation}</p></div>`;

// Channels tab
document.getElementById('channels').innerHTML = `
<h1>Channel Plan</h1>
<p class="sub">Ranked by velocity for a pre-month-end close</p>
<div class="card"><table>
<tr><th>#</th><th>Channel</th><th>Cost</th><th>Why</th><th>Action</th></tr>
${C.priority_channels.map(c=>`<tr><td><b>${c.rank}</b></td><td>${c.channel}</td><td>${c.cost}</td><td>${c.why}</td><td>${c.action}</td></tr>`).join('')}
</table></div>

<div class="grid g2" style="margin-top:16px">
<div class="card"><h3>Legal Guardrails</h3><ul style="margin-left:18px;font-size:14px;line-height:1.8">
${C.legal_guardrails.map(g=>`<li>${g}</li>`).join('')}</ul></div>

<div class="card"><h3>Where To Post (links)</h3>
<table><tr><th>Group/Site</th><th></th></tr>
${[...(PT.facebook_groups||[]),...(PT.fsbo_sites||[])].map(g=>{const n=g.name||g.title||g.url; const u=g.url||g.link||'#'; return `<tr><td>${n}</td><td><a href="${u}" target="_blank">open ↗</a></td></tr>`;}).join('')}
</table></div>
</div>`;

// Outreach tab
const contactable = T.filter(t=>(t.phones&&t.phones.length)||(t.emails&&t.emails.length));
document.getElementById('outreach').innerHTML = `
<h1>Note-Buyer Outreach</h1>
<p class="sub">${T.length} targets researched · ${contactable.length} contactable · pre-commit one buyer before you originate</p>
<div class="card"><table>
<tr><th>Company</th><th>Phone</th><th>Email</th><th>Link</th></tr>
${contactable.map(t=>`<tr><td>${t.name}</td><td>${(t.phones||[]).join(', ')||'n/a'}</td><td>${(t.emails||[]).join(', ')||'n/a'}</td><td><a href="${t.url}" target="_blank">open ↗</a></td></tr>`).join('')}
</table></div>`;

// Copy tab
function renderCopy(obj, depth){
  let h='';
  for(const [k,v] of Object.entries(obj)){
    if(typeof v==='string'){
      h+=`<details ${depth===0?'open':''}><summary>${k}</summary><div class="pre">${v.replace(/[YOUR PHONE]/g,'<b style="color:var(--red)">[YOUR PHONE]</b>')}</div></details>`;
    } else if(Array.isArray(v)){
      h+=`<details ${depth===0?'open':''}><summary>${k}</summary>`+v.map(x=>`<div class="pre">${typeof x==='string'?x.replace(/[YOUR PHONE]/g,'<b style="color:var(--red)">[YOUR PHONE]</b>'):JSON.stringify(x,null,1)}</div>`).join('')+`</details>`;
    } else if(typeof v==='object'&&v){
      h+=`<details><summary>${k}</summary>${renderCopy(v,depth+1)}</details>`;
    }
  }
  return h;
}
document.getElementById('copy').innerHTML = `<h1>Ad Copy</h1><p class="sub">Ready to paste. Replace [YOUR PHONE] everywhere before posting.</p><div class="card">${renderCopy(A,0)}</div>`;

// Sprint tab
const rows=[];
rows.push(...(S.completed||[]).map(e=>typeof e==='string'?{date:'',note:e}:e));
rows.push(...(S.next_automatable||[]).map(e=>typeof e==='string'?{date:'',note:'NEXT: '+e}:e));
document.getElementById('sprint').innerHTML = `
<h1>Sprint Log</h1>
<div class="card"><table><tr><th>Item</th></tr>
${rows.map(e=>`<tr><td>${e.note||e}</td></tr>`).join('')}
</table></div>
<div class="card" style="margin-top:16px"><h3>Blockers (manual only)</h3><ul style="margin-left:18px;font-size:14px;line-height:1.8">
${(S.blockers_user_only||[]).map(e=>`<li>${typeof e==='string'?e:e.note||JSON.stringify(e)}</li>`).join('')}
</ul></div>`;

/* ===== PLAYBOOK TAB ===== */
document.getElementById('playbook').innerHTML = `
<h1>Validated Playbook</h1>
<p class="sub">How professionals run a seller-finance sale. Every claim sourced on the Sources tab.</p>
<div class="grid g2">
  <div class="card"><h3>1. Qualify Like a Bank</h3>
    <p style="font-size:14px;line-height:1.7">Credit report, verified income, reserves, references. Pros require 20-30% down as the default deterrent. Current terms at $20K down = 3.6% LTV-equivalent on a $560K note. The single highest-ROI change: set minimum $35K down, or accept $20K only with full income documentation and a note-buyer pre-commitment.</p>
    <p class="note">Risk avoided: default on a 96% LTV bank-reject buyer.</p></div>
  <div class="card"><h3>2. Term Sheet First, Attorney Second</h3>
    <p style="font-size:14px;line-height:1.7">Lock price / rate / term / balloon in an LOI, then a GA attorney drafts the promissory note and security deed. In Georgia the security deed is stronger than a mortgage: seller holds title until payoff.</p>
    <p class="note">Flat fee $1,500-2,500; needed at signing, not now.</p></div>
  <div class="card"><h3>3. Third-Party Loan Servicing</h3>
    <p style="font-size:14px;line-height:1.7">Pros never collect payments personally. A note servicer (~$25/mo) keeps records, handles 1098 reporting and escrow. Serviced notes sell for smaller discounts later.</p>
    <p class="note">Sign up at closing.</p></div>
  <div class="card"><h3>4. Exit Is Built In</h3>
    <p style="font-size:14px;line-height:1.7">5-yr balloon ~$534,745 is standard (5-10 yr norms). Buyer prepares to refinance 6-12 months before balloon. Pre-commit a note buyer BEFORE originating to lock exit pricing.</p>
    <p class="note">Call Athens Note Buyers 470-548-6711 first.</p></div>
  <div class="card"><h3>5. Dodd-Frank / SAFE Act Exemption</h3>
    <p style="font-size:14px;line-height:1.7">One seller-financed sale of your own property per 12 months is exempt from originator licensing IF: no balloon under 2 years, fixed rate or adjustable after 5 years, and documented good-faith ability-to-repay screening. This deal's 8.5% fixed + 5-yr balloon fits.</p>
    <p class="note">Keep the written ability-to-repay file: that IS the compliance artifact.</p></div>
  <div class="card"><h3>6. Channels Ranked for &lt;30 Days</h3>
    <p style="font-size:14px;line-height:1.7">$29.5B in seller-financed notes were created in 2025 across 87,212 transactions; residential is 62% of volume. ~700 owner-finance homes listed in GA on Zillow means the fight is visibility. Free and fastest: FB Marketplace, FB group 814069525827283, Craigslist. Zillow/MLS stays passive; do not cut price. Terms ARE the price cut.</p>
    <p class="note">Edge vs those 700 listings: 6bd + separate-entrance in-law suite.</p></div>
</div>
<div class="card" style="margin-top:16px"><h3>Action Order (Highest ROI First)</h3>
<table><tr><th>#</th><th>Action</th><th>Owner</th></tr>
<tr><td>1</td><td>Rewrite minimum terms: $35K+ down (or full income package at $20K)</td><td>You decide; I rewrite copy</td></tr>
<tr><td>2</td><td>Post to 2 FB groups + Marketplace + Craigslist (copy ready in Ad Copy tab)</td><td>Manual, this week</td></tr>
<tr><td>3</td><td>Call 2 warm GA note buyers for written indicative pricing</td><td>Manual</td></tr>
<tr><td>4</td><td>Engage GA attorney for note + security deed templates</td><td>At signing</td></tr>
<tr><td>5</td><td>Sign up loan servicer at closing (~$25/mo)</td><td>At closing</td></tr>
</table></div>`;

/* ===== SOURCES TAB ===== */
const SRC=[
 ['Seller financing 2025 industry report: $29.5B notes created, 87,212 transactions, 62% residential','noteinvestor.com/notes-101/seller-financing-2025-industry-report','https://noteinvestor.com/notes-101/seller-financing-2025-industry-report/'],
 ['Note valuation = discounted cash flow, not face value; 8% note in 10%-yield market trades at discount','noteservicingcenter.com','https://noteservicingcenter.com/how-to-accurately-value-your-seller-financed-note/'],
 ['Note buyers underwrite to 10-12% yield; performing SFR notes trade ~65-70% of equity','r/realestateinvesting + FB note-buyer groups (practitioner quotes)','https://www.reddit.com/r/realestateinvesting/comments/1q4w16l/'],
 ['Owner-finance homes in GA on Zillow: ~700 listings (competition baseline)','zillow.com/ga/owner-financing_att/','https://www.zillow.com/ga/owner-financing_att/'],
 ['FB group "Owner Finance houses Georgia", 6.6K+ members, active marketplace rules','facebook.com/groups/814069525827283','https://www.facebook.com/groups/814069525827283/'],
 ['Dodd-Frank / SAFE Act one-sale exemption conditions (balloon rules, ability-to-repay)','NAR seller-financing guidance + Investopedia owner-financing overview','https://www.investopedia.com/articles/pf/08/owner-financing.asp'],
 ['Gwinnett County market: median DOM ~50 days; median sale ~$409K (down 2.7% YoY); ~half of listings fail to sell at ask','Redfin county report + Fed DOM series + tucasaengeorgia 2026 analysis','https://www.redfin.com/county/570/GA/Gwinnett-County/housing-market'],
 ['Zestimate $570,600 and rent Zestimate $2,999 for subject property','Zillow property page 14802515_zpid','https://www.zillow.com/homedetails/1244-Hadaway-Ct-Lawrenceville-GA-30043/14802515_zpid'],
 ['MLS listing facts: price $580K, cut $20K on 8/7, 56 DOM, MLS #10811256, 6/3, 3,650 sqft','MLS feed as shown on Zillow property page','same Zillow URL as above'],
 ['Comps: 997 Sunny Glen $448K, 1205 Grace Hadaway $495K, 1021 Adah $485K, 977 Sunny Glen $485K','Zillow recent-sold/nearby data captured 2026-09-17','same Zillow URL as above'],
 ['GA note buyers: Athens Note Buyers 470-548-6711; private buyer 678-665-0545','Live web directory sweep during sprint build','see Outreach tab'],
];
document.getElementById('sources').innerHTML = `
<h1>Sources</h1>
<p class="sub">Where every number on this site comes from. Verified 2026-09-17.</p>
<div class="card" style="margin-top:20px">
<table><tr><th>Claim / Data</th><th>Source</th><th>Link</th></tr>
${SRC.map(([c,s,u])=>`<tr><td style="max-width:340px">${c}</td><td>${s}</td><td><a href="${u}" target="_blank" rel="noopener">open ↗</a></td></tr>`).join('')}
</table></div>
<div class="card" style="margin-top:16px"><h3>Provenance of local files</h3>
<p style="font-size:14px;line-height:1.7">data/ property.json, finance-model.json, personas.json, channel-plan.json, ad-copy.json, outreach-targets.json, post-targets.json, sprint-log.json, and VA-RUNBOOK.md were compiled 2026-09-18 from the Zillow listing page, Gwinnett market data above, and live web sweeps of GA note buyers. call-sheet.csv and leads.csv derive from outreach-targets.json. data.js is the bundled copy of those files; site/ is the source of truth, docs/ is the deployed mirror.</p></div>`;
