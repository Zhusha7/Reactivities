import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Props = {
  position: [number, number];
  venue: string;
};

export default function MapComponent({ position, venue }: Props) {
  return (
    <MapContainer
      style={{ height: "100%" }}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
}
