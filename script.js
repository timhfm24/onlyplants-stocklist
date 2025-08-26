const list = document.getElementById('plantList');
document.getElementById('year').textContent = new Date().getFullYear();


fetch('plants.json', { cache: 'no-store' })
.then(r => r.json())
.then(data => {
  setCategoryOptions(data);
  render(data);
})
.catch(err => {
  list.innerHTML = '<li>Fehler beim Laden der Stocklist.</li>';
  console.error(err);
});


function render(plants) {
list.innerHTML = plants.map(p => `<li>${escapeHTML(p.name)}</li>`).join('');
}


// Dynamisch die Kategorie-Optionen aus den Daten generieren
function setCategoryOptions(plants) {
  const typeFilter = document.getElementById('typeFilter');
  const categories = Array.from(new Set(plants.map(p => p.category)));
  typeFilter.innerHTML = '<option value="">Typ: Alle</option>' +
    categories.map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('');
}


function escapeHTML(s){
return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}
