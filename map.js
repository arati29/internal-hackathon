let map;
let markersGroup = L.layerGroup();
let routeLine = null;

function initMap() {
  // Default coordinates (Pune)
  map = L.map('map').setView([18.5204, 73.8567], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  markersGroup.addTo(map);
}

function updateMapPins(locationsArray) {
  markersGroup.clearLayers();
  if (routeLine) map.removeLayer(routeLine);

  if (!locationsArray || locationsArray.length === 0) return;

  const polylineCoordinates = [];

  locationsArray.forEach((spot, index) => {
    const latLng = [spot.lat, spot.lng];
    polylineCoordinates.push(latLng);

    const marker = L.marker(latLng).bindPopup(`
      <b>${index + 1}. ${spot.name}</b><br>${spot.desc}
    `);

    markersGroup.addLayer(marker);
  });

  routeLine = L.polyline(polylineCoordinates, {
    color: '#007bff',
    weight: 4,
    dashArray: '6, 6'
  }).addTo(map);

  map.fitBounds(L.latLngBounds(polylineCoordinates), { padding: [30, 30] });
}

window.onload = () => {
  initMap();

  // Temporary test data to verify visually in VS Code
//   setTimeout(() => {
//     updateMapPins([
//       { name: "Shaniwar Wada", desc: "Historic Peshwa palace site", lat: 18.5196, lng: 73.8553 },
//       { name: "Lal Mahal", desc: "Historic landmark", lat: 18.5186, lng: 73.8564 },
//       { name: "Dagdusheth Temple", desc: "Famous landmark", lat: 18.5165, lng: 73.8560 }
//     ]);
//   }, 1000);
// };

// Expose the function globally so other team members can call it
window.updateMapPins = updateMapPins;