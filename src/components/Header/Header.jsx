import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const fetchIPLocation = async () => {
    try {
      const response = await fetch(
        `https://ipapi.co/json/` // Or another IP geolocation service
      );
      const data = await response.json();
      console.log("IP-based Location:", data);
      setLocation(`${data.city}, ${data.region}`);
    } catch (error) {
      console.error("Error fetching IP location:", error.message);
    }
  };

  const fetchGPSLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("GPS Location:", { latitude, longitude });

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
          );
          const data = await response.json();

          if (data.results && data.results.length > 0) {
            setLocation(
              data.results[0].formatted_address || "Unknown location"
            );
          } else {
            setLocationError("Unable to fetch location details.");
          }
        } catch (error) {
          console.error("Error during reverse geocoding:", error.message);
          setLocationError("Failed to fetch location.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setLocationError("Permission denied or unable to retrieve location.");
        setLoadingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchIPLocation();
    fetchGPSLocation();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="row"
      maxWidth="1280px"
      mx="auto"
      height={20}
      alignItems="center"
      justifyContent="space-between"
      padding={{ base: "0 20px", md: "0 80px" }}
    >
      {/* Logo */}
      <Link href="/">
        <Box display="flex" alignItems="center">
          <Image
            src="/assets/logo-1.png"
            alt="city-chase logo"
            width={150}
            height={150}
            draggable={false}
          />
        </Box>
      </Link>

      {/* Current Location */}
      <Box display="flex" flexDirection="column" alignItems="center">
        {loadingLocation ? (
          <Spinner size="sm" />
        ) : location ? (
          <Text fontSize="sm" isTruncated>
            {location}
          </Text>
        ) : (
          <Text fontSize="sm" color="red.500">
            {locationError || "Unable to fetch location."}
          </Text>
        )}
      </Box>

      {/* User Options */}
      <Box display="flex" alignItems="center" gap="20px">
        {user ? (
          <>
            <Link href="/pages/city">
              <Button colorScheme="blue" variant="ghost" fontSize="lg">
                City
              </Button>
            </Link>
            <Link href="/pages/favorites">
              <Button colorScheme="blue" variant="ghost" fontSize="lg">
                Favorites
              </Button>
            </Link>
            <Menu>
              <MenuButton>
                <Avatar size="sm" name={user.email} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => alert("Profile clicked!")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => alert("Dashboard clicked!")}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Link href="/pages/login">
            <Button
              colorScheme="pink"
              borderRadius="50px"
              padding="0 28px"
              fontSize="lg"
            >
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
