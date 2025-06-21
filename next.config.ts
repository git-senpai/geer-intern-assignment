import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("https://", "") || "",
    ].filter(Boolean),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
