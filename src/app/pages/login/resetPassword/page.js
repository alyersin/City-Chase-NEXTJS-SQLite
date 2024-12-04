// components/Header/Header.js

"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <Flex as="nav" align="center" justify="space-between">
      {/* Logo and other links */}
      <Box>
        <Link href="/">Home</Link>
        <Link href="/City" ml="4">
          Cities
        </Link>
        {isLoggedIn && (
          <Link href="/Favorites" ml="4">
            Favorites
          </Link>
        )}
      </Box>
      {/* User Authentication Links */}
      <Box>
        {isLoggedIn ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUserCircle />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem onClick={() => router.push("/profile")}>
                Profile Details
              </MenuItem>
              <MenuItem onClick={() => router.push("/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href="/pages/login">Login</Link>
        )}
      </Box>
    </Flex>
  );
}
