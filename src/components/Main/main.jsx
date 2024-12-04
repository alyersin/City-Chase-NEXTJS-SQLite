"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAutocompleteSuggestions = async (query) => {
    console.log("Fetching autocomplete suggestions for:", query);

    if (!query) {
      console.log("Query is empty. Clearing suggestions.");
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/google-autocomplete?input=${query}`);
      console.log("API call to /api/google-autocomplete:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from autocomplete API:", errorData);
        setError(errorData.error || "Failed to fetch suggestions.");
        return;
      }

      const data = await response.json();
      console.log("Autocomplete suggestions received:", data.predictions);
      setSuggestions(data.predictions || []);
    } catch (err) {
      console.error("Error fetching autocomplete suggestions:", err.message);
      setError("An error occurred while fetching suggestions.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    console.log("User is typing:", query);
    setKeyword(query);
    fetchAutocompleteSuggestions(query);
  };

  const handleSelectSuggestion = async (suggestion) => {
    console.log("User selected suggestion:", suggestion.description);

    try {
      const response = await fetch(
        `/api/city-details?cityName=${encodeURIComponent(
          suggestion.description
        )}`
      );

      if (!response.ok) {
        console.error("Failed to fetch city details:", await response.text());
        return;
      }

      const cityDetails = await response.json();
      console.log("City details fetched successfully:", cityDetails);

      router.push(
        `/pages/cityDetails?pageData=${encodeURIComponent(
          JSON.stringify(cityDetails)
        )}`
      );
    } catch (error) {
      console.error("Error fetching city details:", error.message);
    }
  };

  return (
    <Box
      as="section"
      width="100%"
      height="100%"
      minHeight="calc(100vh - 112px)"
      backgroundImage="url('/assets/australia-land2.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        maxWidth="1280px"
        width="100%"
        padding="16px"
        textAlign="center"
        color="white"
      >
        <Heading size="xl" marginBottom="16px">
          what&apos;s your destination?
        </Heading>
        <Box position="relative">
          <Input
            placeholder="City, Region or Country"
            value={keyword}
            onChange={handleChange}
            width={{ base: "100%", md: "300px" }}
            bg="white"
            color="black"
            _placeholder={{ color: "gray.500" }}
          />
          {suggestions.length > 0 && (
            <List
              position="absolute"
              top="100%"
              left="0"
              width={{ base: "100%", md: "300px" }}
              bg="white"
              color="black"
              zIndex="10"
              border="1px solid #ccc"
              borderRadius="md"
              boxShadow="md"
              maxHeight="200px"
              overflowY="auto"
              mt="2"
              padding="0"
              boxSizing="border-box"
            >
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion.place_id}
                  padding="8px"
                  borderBottom="1px solid #eee"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.description}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        <Button
          colorScheme="blue"
          width={{ base: "100%", md: "auto" }}
          mt="8"
          onClick={() => console.log("Search triggered with:", keyword)}
          isLoading={loading}
        >
          Search
        </Button>
        {error && (
          <Text color="red.400" mt="4">
            {error}
          </Text>
        )}
      </Box>
    </Box>
  );
}
