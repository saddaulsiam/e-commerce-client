import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "tailwindui.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "bonik-react.vercel.app" },
      { protocol: "https", hostname: "flone-react.pages.dev" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "chaldn.com" },
      { protocol: "https", hostname: "daisyui.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "images.apple.com" },
      { protocol: "https", hostname: "images.samsung.com" },
      { protocol: "https", hostname: "www.sony.com" },
      { protocol: "https", hostname: "i.dell.com" },
      { protocol: "https", hostname: "www.usa.canon.com" },
      { protocol: "https", hostname: "www.apple.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
