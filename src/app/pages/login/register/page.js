"use client";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Register() {
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: e.target["first-name"].value,
      lastName: e.target["last-name"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    console.log("Form Submitted with Data:", formData); // Debug

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("API Response:", data); // Debug

    if (data.success) {
      alert("User registered successfully!");
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <Box
      bg="linear-gradient(179.41deg, #D3E6FF 0.51%, #FFFFFF 100%)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      width="100vw"
      gap="24px"
      padding="16px"
    >
      <Box
        bg="white"
        borderRadius="10px"
        width={{ base: "100%", md: "500px" }}
        maxWidth="500px"
        padding="24px"
        boxShadow="md"
      >
        <Heading as="h2" size="lg" textAlign="center" color="#00308F">
          Create Your Account
        </Heading>
        <Text fontSize="sm" textAlign="center" color="gray.600" mb="6">
          Register to get started
        </Text>
        <form onSubmit={handleRegister}>
          <FormControl id="first-name" mb="4">
            <FormLabel fontSize="sm" color="#00308F">
              First Name
            </FormLabel>
            <Input type="text" placeholder="Enter your first name" />
          </FormControl>
          <FormControl id="last-name" mb="4">
            <FormLabel fontSize="sm" color="#00308F">
              Last Name
            </FormLabel>
            <Input type="text" placeholder="Enter your last name" />
          </FormControl>
          <FormControl id="email" mb="4">
            <FormLabel fontSize="sm" color="#00308F">
              Email
            </FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl id="password" mb="4">
            <FormLabel fontSize="sm" color="#00308F">
              Password
            </FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <FormControl id="confirm-password" mb="6">
            <FormLabel fontSize="sm" color="#00308F">
              Confirm Password
            </FormLabel>
            <Input type="password" placeholder="Confirm your password" />
          </FormControl>
          <Button
            type="submit"
            bg="#2563EB"
            textColor="white"
            width="100%"
            borderRadius="50px"
            height="50px"
          >
            Sign Up
          </Button>
        </form>
        <Text fontSize="sm" textAlign="center" mt="4">
          Already have an account?{" "}
          <Link href="/pages/login">
            <Text as="span" color="blue.500" textDecoration="underline">
              Login here
            </Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
