"use client";
import { Box, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";

import React from "react";

export default function Footer() {
  return (
    <div>
      <Box
        as="footer"
        width="100%"
        bg="gray.900"
        color="white"
        padding="16px"
        textAlign="center"
      >
        <Text fontSize="xs" mb="8px">
          &copy; {new Date().getFullYear()} City-Chase. All rights reserved.
        </Text>
        <HStack justify="center" spacing="20px">
          <Link href="https://github.com/alyersin" isexternal="true">
            <Icon as={FaGithub} boxSize="6" _hover={{ color: "gray.400" }} />
          </Link>
          <Link href="https://www.linkedin.com/in/ersin-ali-228301107/">
            <Icon as={FaLinkedin} boxSize="6" _hover={{ color: "blue.400" }} />
          </Link>
          <Link href="https://www.facebook.com/aly.ersin" isexternal="true">
            <Icon as={FaFacebook} boxSize="6" _hover={{ color: "blue.600" }} />
          </Link>
          <Link href="https://x.com/shase6" isexternal="true">
            <Icon as={FaTwitter} boxSize="6" _hover={{ color: "blue.500" }} />
          </Link>
        </HStack>
      </Box>
    </div>
  );
}
