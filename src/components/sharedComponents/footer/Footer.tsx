import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import googlePlay from "../../../../public/logo/googleplay.png";
import logo from "../../../../public/logo/logo.svg";

const socialLinks = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    link: "https://facebook.com",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    link: "https://twitter.com",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    link: "https://instagram.com",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    link: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="bg-white py-12 text-gray-700">
      <div className="container px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" aria-label="Home" className="inline-block">
              <Image
                src={logo}
                alt="Company Logo"
                width={120}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-base leading-7">
              Your trusted shopping destination. Quality products, fast
              delivery, and friendly support.
            </p>
            <Link
              href="https://play.google.com/store"
              aria-label="Get app on Google Play"
              className="inline-block"
            >
              <Image
                src={googlePlay}
                alt="Get app on Google Play"
                className="w-36 transition-opacity duration-300 hover:opacity-80"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
            <nav aria-label="Quick Links Navigation" className="grid gap-2">
              {[
                "New Arrivals",
                "Best Sellers",
                "Special Offers",
                "Store Locator",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-base transition-colors duration-300 hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Support</h3>
            <nav aria-label="Support Navigation" className="grid gap-2">
              {["Help Center", "Order Tracking", "Returns", "Contact Us"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-base transition-colors duration-300 hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {item}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact</h3>
            <div className="space-y-2 text-base">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-gray-500" aria-hidden="true" />
                <a
                  href="tel:+1234567890"
                  className="transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" aria-hidden="true" />
                <a
                  href="mailto:hello@example.com"
                  className="transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  hello@example.com
                </a>
              </div>
              <p className="mt-4">
                123 Shopping Street
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.link}
                  className="text-gray-500 transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>

          {/* Legal */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Terms of Service
            </Link>
            <span>© 2024 Siam Store. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
