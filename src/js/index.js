import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

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
    hideSingleBase: false,
  })
  .addTo(map);

map.setView(defaultCenter, defaultZoom);
basemap.addTo(map);

L.marker(defaultCenter)
  .bindTooltip('Marker Example', {
    direction: 'top',
    permanent: true,
    opacity: 0.8,
    offset: [-15, -10],
  })
  .addTo(map);
