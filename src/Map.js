import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";
// node_modules\leaflet\dist\leaflet.css
// import * as L from 'leaflet';

const MapComponent = ({ lat, lng }) => {
  let cent = [];
  cent.push(lat);
  cent.push(lng);
  console.log(cent);
  //   const [cent, setcent] = useState([]);
  //   const [ready, setready] = useState(false)
  //   let centi = [];
  //   let lati, long;
  //   long = -118.24368;
  //   lati = 37.38605;
  //   useEffect(() => {
  //     console.log(lati);
  //     console.log(long);
  //     centi.push(lati);
  //     centi.push(long);
  //     // setcent(centi);
  //   }, [lati, long]);

  //   useEffect(() => {
  //     if (centi) {
  //       setcent(centi);
  //       console.log(cent);
  //       setready(true);
  //     }
  //   }, [centi]);

  //   let myMap = L.map('map', {
  //     center: [lat, lng],
  //     zoom: 13,
  //   });

  //   L.tileLayer(
  //     'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  //     {
  //       attribution:
  //         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //       maxZoom: 18,
  //       id: 'mapbox/streets-v11',
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  //     }
  //   ).addTo(myMap);

  //   return lat || lng ? (
  //     <MapContainer
  //       center={[lat, lng]}
  //       zoom={13}
  //       style={{ width: '100%', height: '900px' }}
  //     >
  //       <TileLayer
  //         attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  //         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //       />
  //     </MapContainer>
  //   ) : (
  //     'Data is loading...'
  //   );

  return (
    <MapContainer center={cent} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={cent}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
