import { TooltipProvider } from "@/components/ui/tooltip";
import MotionProvider from "@/providers/AnimatedWrapper";
import MainProviders from "@/providers/MainProviders";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siam Store",
  description: "Multi Vendor E-commerce Platform",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <meta name="gr:allow" content="false" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionProvider>
          <MainProviders>
            <TooltipProvider>{children}</TooltipProvider>
          </MainProviders>
          <ToastContainer autoClose={2000} />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
