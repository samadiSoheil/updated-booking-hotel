import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import useMapLocation from "../../hooks/useMapLocation";

const Map = ({ data, isLoading, updaterSelected }) => {
  const [lat, lang] = useMapLocation();
  const [position, setPosition] = useState([lat || 51.505, lang || -0.09]);
  const { id } = useParams();

  useEffect(() => {
    if (lang && lat && id) {
      setPosition([lat, lang]);
      updaterSelected(id);
    }
  }, [lang, lat]);

  if (isLoading) return <div>Loading data...</div>;
  return (
    <>
      <div className="mapContainer">
        <MapContainer className="map" center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeCenter position={position} />
          <DetectClickUser setCenter={setPosition} />
          {data?.map((item) => {
            return (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>{item.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}

function DetectClickUser({ setCenter }) {
  const navigateUser = useNavigate();
  useMapEvent({
    click: (e) => {
      setCenter([e.latlng.lat, e.latlng.lng]);
      navigateUser(`/bookmarks/add?lat=${e.latlng.lat}&lang=${e.latlng.lng}`);
    },
  });

  return null;
}
