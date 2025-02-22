import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tailwindui.com",
      "i.ibb.co",
      "bonik-react.vercel.app",
      "flone-react.pages.dev",
      "media.istockphoto.com",
      "images.pexels.com",
      "res.cloudinary.com",
      "chaldn.com",
      "daisyui.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
