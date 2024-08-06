"use client";
import React from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
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
  setApartmentDetails?: any;
  apartmentDetails?: any;
}
function MyComponent({ setApartmentDetails, apartmentDetails }: any) {
  const map = useMapEvent("click", (e) => {
    // console.log(e.latlng);
    setApartmentDetails({
      ...apartmentDetails,
      locationValue: {
        ...apartmentDetails.locationValue,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      },
    });
    map.setView(e.latlng, map.getZoom());
  });
  return null;
}

const Map: React.FC<MapProps> = ({ setApartmentDetails, apartmentDetails }) => {
  return (
    <div className="w-full">
      <MapContainer
        center={[30.033333, 31.233334]}
        zoom={8}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-[5px]"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {apartmentDetails.locationValue.lat && (
          <Marker
            position={[
              apartmentDetails.locationValue.lat,
              apartmentDetails.locationValue.lng,
            ]}
          />
        )}
        <MyComponent
          setApartmentDetails={setApartmentDetails}
          apartmentDetails={apartmentDetails}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
