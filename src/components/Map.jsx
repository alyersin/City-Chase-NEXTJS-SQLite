import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function Map({ latitude, longitude }) {
  console.log("Rendering Map component...");
  console.log("Latitude received by Map:", latitude);
  console.log("Longitude received by Map:", longitude);
  console.log("Google API Key in use:", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  if (loadError) {
    console.error("Error loading Google Maps script:", loadError.message);
    return <p>Error loading map. Please try again later.</p>;
  }

  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    console.error("Invalid latitude or longitude provided:", {
      latitude,
      longitude,
    });
    return <p>Invalid location data. Cannot display map.</p>;
  }

  if (!isLoaded) {
    console.log("Google Maps script is still loading...");
    return <p>Loading Map...</p>;
  }

  console.log("Google Maps script loaded successfully.");

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
      zoom={12}
      onLoad={() => console.log("Map loaded successfully.")}
    >
      <Marker
        position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
        onLoad={() =>
          console.log("Marker added at coordinates:", { latitude, longitude })
        }
      />
    </GoogleMap>
  );
}
