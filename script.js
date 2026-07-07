fetch('data.json').then(r=>r.json()).then(d=>{
document.getElementById('app').innerHTML=`<p>Loaded ${d.length} characters.</p><p>Sorter logic coming next.</p>`;
});