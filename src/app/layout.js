"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = [
    "/pages/login",
    "/pages/login/register",
    "/pages/login/resetPassword",
  ];

  const shouldShowLayout = !noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {" "}
          <ChakraProvider>
            <Box display="flex" flexDirection="column" minHeight="100vh">
              {shouldShowLayout && (
                <Box as="header" width="100%" flexShrink={0}>
                  <Header />
                </Box>
              )}
              <Box as="main" flexGrow={1} width="100%" padding="0">
                {children}
              </Box>
              {shouldShowLayout && (
                <Box
                  as="footer"
                  width="100%"
                  bg="gray.900"
                  color="white"
                  flexShrink={0}
                >
                  <Footer />
                </Box>
              )}
            </Box>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
