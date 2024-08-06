"use client";
import React from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  IconUrl: MarkerIcon.src,
  IconRetinaUrl: MarkerIcon2x.src,
  shadowUrl: MarkerShadow.src,
});
interface MapProps {
  center: String[] | any;
}
const ApartmentLocation: React.FC<MapProps> = ({ center }) => {
  return (
    <div className="mt-10">
      <h1 className="text-[#1e4164] font-bold text-xl">
        Location of Apartment in Map
      </h1>
      <div className="w-full mt-5">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          className="h-[50vh] rounded-[5px]"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={center} />
        </MapContainer>
      </div>
    </div>
  );
};

export default ApartmentLocation;
