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
      "example.com",
      "images.apple.com",
      "images.samsung.com",
      "www.sony.com",
      "i.dell.com",
      "www.usa.canon.com",
      "www.apple.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
