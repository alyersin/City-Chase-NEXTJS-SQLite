"use client";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch the user's favorites from the API or database
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFavorites(data.favorites || []);
        } else {
          console.error("Failed to fetch favorites.");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  if (!user) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        padding="16px"
      >
        <Heading as="h2" size="lg" mb="4">
          You are not logged in!
        </Heading>
        <Text mb="6">
          Please <Link href="/pages/login">log in</Link> to view your favorites.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // minHeight="100vh"
      padding="16px"
    >
      <Heading as="h2" size="lg" mb="6">
        Your Favorites
      </Heading>
      {favorites.length > 0 ? (
        <VStack spacing={4} align="stretch" width="100%" maxWidth="600px">
          {favorites.map((favorite, index) => (
            <Box
              key={index}
              padding="16px"
              borderWidth="1px"
              borderRadius="10px"
              boxShadow="md"
              width="100%"
              bg="white"
            >
              <Text fontSize="lg" fontWeight="bold" mb="2">
                {favorite.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {favorite.description}
              </Text>
              <Button
                colorScheme="red"
                mt="4"
                onClick={() => alert(`Remove ${favorite.name} from favorites`)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text fontSize="md" color="gray.600">
          You don't have any favorites yet.
        </Text>
      )}
    </Box>
  );
}
