import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA plugin
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Only active in production
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ ADDED: Silences the Turbopack warning in Next.js 16
  turbopack: {}, 
  // ✅ REMOVED: The 'eslint' block, as Next.js 16 no longer supports it here
};

// Export the wrapped config
export default withPWA(nextConfig);