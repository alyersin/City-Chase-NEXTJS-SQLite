"use client";

import React, { useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

export default function CityDetails({ cityDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorites = async () => {
    console.log("Attempting to add city to favorites...");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cityDetails }),
      });

      console.log("API response:", response);

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to add favorite:", error);
        alert(error.error || "Failed to add favorite.");
        return;
      }

      const data = await response.json();
      console.log("Favorite added successfully:", data);
      alert("Added to favorites!");

      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
      alert("An error occurred while adding to favorites.");
    }
  };

  return (
    <Box mt="8" color="white">
      <Heading size="md" textAlign="center" color="white" mb="8">
        City Details
      </Heading>
      <Box
        mt="4"
        bg="white"
        color="black"
        p="4"
        borderRadius="md"
        textAlign="left"
        maxWidth="600px"
        margin="0 auto"
      >
        <Text fontWeight="bold">Name: {cityDetails.name}</Text>
        <Text>Country: {cityDetails.country}</Text>
        <Text>Latitude: {cityDetails.latitude}</Text>
        <Text>Longitude: {cityDetails.longitude}</Text>
        <Text>Population: {cityDetails.population}</Text>
        <Text>Time Zone: {cityDetails.timeZone}</Text>
        <Button
          mt="4"
          colorScheme={isFavorite ? "green" : "blue"}
          onClick={addToFavorites}
          isDisabled={isFavorite}
        >
          {isFavorite ? "Added to Favorites" : "Add to Favorites"}
        </Button>
      </Box>
    </Box>
  );
}
