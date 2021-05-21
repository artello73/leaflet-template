import 'leaflet/dist/leaflet.css';

const map = L.map('mapid');
const defaultCenter = [38.889269, -77.050176];
const defaultZoom = 15;
const basemap = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  {},
);
L.control
  .layers({ 'Base Map': basemap }, null, {
    collapsed: true,
    hideSingleBase: true,
  })
  .addTo(map);

map.setView(defaultCenter, defaultZoom);
basemap.addTo(map);
