/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Explicitly allow Cloudinary; also add a typo-safe fallback.
    domains: ["res.cloudinary.com", "fres.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "fres.cloudinary.com",
      },
    ],
    // If Cloudinary responds slowly or with non-image payloads, Next.js image
    // optimization can throw 500. Setting unoptimized avoids the proxy step.
    unoptimized: true,
  },
};

module.exports = nextConfig;