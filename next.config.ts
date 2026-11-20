import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92, 95],
    remotePatterns: [
      { protocol: "https", hostname: "ankibaighamandiramgowanitrust.com" },
      { protocol: "https", hostname: "www.ankibaighamandiramgowanitrust.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
