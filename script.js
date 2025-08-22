const list = document.getElementById('plantList');
document.getElementById('year').textContent = new Date().getFullYear();


fetch('plants.json', { cache: 'no-store' })
.then(r => r.json())
.then(data => render(data))
.catch(err => {
list.innerHTML = '<li>Fehler beim Laden der Stocklist.</li>';
console.error(err);
});


function render(plants) {
list.innerHTML = plants.map(p => `<li>${escapeHTML(p.name)}</li>`).join('');
}


function escapeHTML(s){
return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}
