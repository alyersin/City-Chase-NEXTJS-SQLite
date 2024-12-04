import { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

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
