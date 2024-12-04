"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  List,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceTimeout = useRef(null);
  const cache = useRef({});

  const fetchAutocompleteSuggestions = async (query) => {
    console.log("Fetching autocomplete suggestions for:", query);

    if (!query) {
      console.log("Query is empty. Clearing suggestions.");
      setSuggestions([]);
      return;
    }

    if (cache.current[query]) {
      console.log("Serving suggestions from cache:", cache.current[query]);
      setSuggestions(cache.current[query]);
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
      cache.current[query] = data.predictions || [];
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

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchAutocompleteSuggestions(query);
    }, 300);
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
      padding="16px"
    >
      <Box
        maxWidth="1280px"
        width="100%"
        textAlign="center"
        color="white"
        padding="16px"
      >
        <Heading size={{ base: "lg", md: "xl" }} marginBottom="16px">
          what&apos;s your destination?
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap="4px"
        >
          <Box
            position="relative"
            flex="1"
            maxWidth={{ base: "100%", md: "300px" }}
            width="100%"
          >
            <Input
              placeholder="City, Region or Country"
              value={keyword}
              onChange={handleChange}
              width="100%"
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
              id="autocomplete-input"
              height="48px"
            />
            {suggestions.length > 0 && (
              <List
                position="absolute"
                top="calc(100% + 4px)"
                left="0"
                width="100%"
                bg="white"
                color="black"
                zIndex="10"
                border="1px solid #ccc"
                borderRadius="md"
                boxShadow="md"
                maxHeight="200px"
                overflowY="auto"
                padding="0"
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
          <Box mt={{ base: "4", md: "0" }} width={{ base: "100%", md: "auto" }}>
            <Button
              colorScheme="blue"
              onClick={() => console.log("Search triggered with:", keyword)}
              isLoading={loading}
              height="48px"
              padding="0 24px"
              width="100%"
            >
              Search
            </Button>
          </Box>
        </Flex>
        {error && (
          <Text color="red.400" mt="4" fontSize={{ base: "sm", md: "md" }}>
            {error}
          </Text>
        )}
      </Box>
    </Box>
  );
}
