// Overview tab
document.getElementById('overview').innerHTML = `
<h1>1244 Hadaway Ct NE</h1>
<p class="sub">Lawrenceville, GA 30043 · ${P.mls ? 'MLS #'+P.mls : ''} · ${P.status} · ${P.dom} days on market</p>

<div class="grid g3">
  <div class="card"><h3>List Price</h3><div class="big">${fmt(P.price)}</div><p class="note">Cut ${fmt(P.price_cut.amount)} on ${P.price_cut.date} (was ${fmt(P.price_cut.prior_price)})</p></div>
  <div class="card"><h3>Zestimate</h3><div class="big">${fmt(P.zestimate)}</div><p class="note">Range ${fmt(P.zestimate_range[0])} – ${fmt(P.zestimate_range[1])}</p></div>
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
<p style="font-size:14px;line-height:1.6"><b>Issue:</b> ${C.price_strategy.issue}</p>
<p style="font-size:14px;line-height:1.6;margin-top:10px"><b class="green">Recommendation:</b> ${C.price_strategy.recommendation}</p></div>`;

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
${contactable.map(t=>`<tr><td>${t.name}</td><td>${(t.phones||[]).join(', ')||'—'}</td><td>${(t.emails||[]).join(', ')||'—'}</td><td><a href="${t.url}" target="_blank">open ↗</a></td></tr>`).join('')}
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
