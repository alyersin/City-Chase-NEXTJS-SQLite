import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  // console.log("User in Header:", user);

  return (
    <Box
      display="flex"
      flexDirection="row"
      maxWidth="1280px"
      mx="auto"
      height={20}
      border="1px solid black"
      // bg="gray.200"
      alignItems="center"
      justifyContent="space-between"
      padding="0 20px"
    >
      {/* Logo  */}
      <Link href="/">
        <Box display="flex" alignItems="center">
          <Image
            src="/assets/logo.png"
            alt="city-chase logo"
            width={200}
            height={200}
          />
        </Box>
      </Link>

      {/* Navigation  */}
      <Box display="flex" alignItems="center" gap="20px">
        {user && (
          <Box>
            {" "}
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
          </Box>
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
    </Box>
  );
}
