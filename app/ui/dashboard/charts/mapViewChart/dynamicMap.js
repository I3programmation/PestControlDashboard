import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import styles from './DynamicMap.module.css';


const DEFAULT_CENTER = [45.508888, -73.561668];
const DynamicMap = ({ data }) => {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Geographical Distribution</h2>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "88%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item, indx) =>
        (
          <Marker key={item.id} position={[item.latitude.toFixed(4), item.longitude.toFixed(4)]}  animate={true}>
            <Popup>Client Name: {item.firstName}</Popup>
            {console.log(item.latitude.toFixed(4))}
          </Marker>
        )
        )}
      </MapContainer>
    </div>
  );
}

export default DynamicMap;