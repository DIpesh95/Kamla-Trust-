import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 92, 95],
    contentDispositionType: "inline",
    remotePatterns: [
      { protocol: "https", hostname: "ankibaighamandiramgowanitrust.com" },
      { protocol: "https", hostname: "www.ankibaighamandiramgowanitrust.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
