import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // iOS optimization: Better compression and formats
    formats: ["image/avif", "image/webp"],
    // Responsive image sizes optimized for iOS devices
    deviceSizes: [320, 375, 390, 430, 640, 750, 828, 1080, 1200, 1920],
  },
  // Compression for better iOS performance
  compress: true,
  // Optimize for iOS Safari
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Support iOS 15+ safe area
          {
            key: "viewport-fit",
            value: "cover",
          },
        ],
      },
    ];
  },
  // Experimental features for better iOS performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
