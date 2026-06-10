/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "image.mux.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google OAuth avatars
    ],
  },
  // Suppress non-critical build warnings that would fail CI
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure Prisma edge runtime warning is suppressed
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
};

export default nextConfig;
