import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ankibaighamandiramgowanitrust.com" },
      { protocol: "https", hostname: "www.ankibaighamandiramgowanitrust.com" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },
};

export default nextConfig;
