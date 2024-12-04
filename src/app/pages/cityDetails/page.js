"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import CityDetails from "./CityDetails";
import Map from "@/components/Map";

export default function CityDetailsPage() {
  const searchParams = useSearchParams();
  const pageData = searchParams.get("pageData");

  const cityDetails = pageData ? JSON.parse(pageData) : null;

  console.log("Parsed cityDetails:", cityDetails);

  const latitude = parseFloat(cityDetails?.latitude) || null;
  const longitude = parseFloat(cityDetails?.longitude) || null;

  console.log("Latitude for Map:", latitude);
  console.log("Longitude for Map:", longitude);

  return (
    <>
      <CityDetails cityDetails={cityDetails} />
      {latitude && longitude ? (
        <Map latitude={latitude} longitude={longitude} />
      ) : (
        <p>No valid location data available for map.</p>
      )}
    </>
  );
}
