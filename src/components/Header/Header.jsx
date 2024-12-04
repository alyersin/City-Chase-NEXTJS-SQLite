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
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    const fetchUserLocation = async () => {
      setLoadingLocation(true);

      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser.");
        setLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

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

    fetchUserLocation();
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
        <Box display="flex" alignItems="center" mx="auto">
          <Image
            src="/assets/logo.png"
            alt="city-chase logo"
            width={150}
            height={150}
            draggable={false}
          />
        </Box>
      </Link>

      {/* Current Location */}
      <Box display="flex" alignItems="center" gap="10px" color="gray.600">
        {loadingLocation ? (
          <Spinner size="sm" />
        ) : location ? (
          <Text fontSize="sm" isTruncated>
            {location}
          </Text>
        ) : (
          <Text fontSize="sm" color="red.500">
            {locationError}
          </Text>
        )}
      </Box>

      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        gap="20px"
      >
        {user && (
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
          </>
        )}
        {user ? (
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

      {/* Hamburger menu */}
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          onClick={toggleDrawer}
        />
        <Drawer isOpen={isDrawerOpen} placement="right" onClose={toggleDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              {user && (
                <>
                  <Link href="/pages/city" onClick={toggleDrawer}>
                    <Button
                      colorScheme="blue"
                      variant="ghost"
                      fontSize="lg"
                      width="100%"
                      mb="2"
                    >
                      City
                    </Button>
                  </Link>
                  <Link href="/pages/favorites" onClick={toggleDrawer}>
                    <Button
                      colorScheme="blue"
                      variant="ghost"
                      fontSize="lg"
                      width="100%"
                      mb="2"
                    >
                      Favorites
                    </Button>
                  </Link>
                </>
              )}
              {user ? (
                <Button
                  colorScheme="pink"
                  variant="solid"
                  width="100%"
                  mt="4"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <Link href="/pages/login" onClick={toggleDrawer}>
                  <Button
                    colorScheme="pink"
                    borderRadius="50px"
                    padding="0 28px"
                    fontSize="lg"
                    width="100%"
                    mt="4"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
}
