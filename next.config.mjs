/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose environment variables for client-side use (safe variables only)
  env: {
    AMADEUS_API_KEY: process.env.AMADEUS_API_KEY, // Safe to expose if needed
  },
};

export default nextConfig;
