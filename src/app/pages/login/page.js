"use client";

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("Login input:", { email, password });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");

        router.push("/");
      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const handleGitHubSignIn = () => {};

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
          Welcome Back!
        </Heading>
        <Text fontSize="sm" textAlign="center" color="gray.600" mb="6">
          Log in to continue to your account
        </Text>
        <form onSubmit={handleLogin}>
          <FormControl id="email" mb="4">
            <FormLabel fontSize="sm" color="#00308F">
              Email
            </FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl id="password" mb="6">
            <FormLabel fontSize="sm" color="#00308F">
              Password
            </FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button
            type="submit"
            bg="#2563EB"
            textColor="white"
            width="100%"
            borderRadius="50px"
            height="50px"
            mb="4"
          >
            Login
          </Button>
          <Text fontSize="sm" textAlign="center">
            Forgot your password?{" "}
            <Link href="/pages/login/resetPassword">
              <Text as="span" color="blue.500" textDecoration="underline">
                Reset it here
              </Text>
            </Link>
          </Text>
          <Flex align="center" mt="6" mb="4">
            <Divider />
            <Text px="2" fontSize="sm" color="gray.500">
              OR
            </Text>
            <Divider />
          </Flex>
          <Button
            variant="outline"
            width="100%"
            borderRadius="50px"
            borderColor="gray.300"
            leftIcon={<FaGithub />}
            onClick={handleGitHubSignIn}
          >
            Sign In with GitHub
          </Button>
        </form>
        <Text fontSize="sm" textAlign="center" mt="4">
          Don’t have an account?{" "}
          <Link href="/pages/login/register">
            <Text as="span" color="blue.500" textDecoration="underline">
              Register here
            </Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
