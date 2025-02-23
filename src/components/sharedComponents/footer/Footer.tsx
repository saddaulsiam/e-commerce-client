import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/logo/logo.svg";
import googlePlay from "../../../../public/logo/googleplay.png";
import { FaFacebookF, FaTwitter, FaYoutube, FaGoogle, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary py-20 px-10 lg:px-3 xl:px-0">
      <div className="container grid grid-cols-12 gap-5 text-my-gray-100 sm:gap-0">
        
        {/* Logo & Description */}
        <div className="col-span-12 space-y-3 sm:col-span-6 lg:col-span-4">
          <Image src={logo} alt="Company Logo" height={35} priority />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis
            mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
          </p>
          <div className="pt-5">
            <Image src={googlePlay} alt="Download on Google Play" priority />
          </div>
        </div>

        {/* About Us */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <h2 className="text-2xl text-white">About Us</h2>
          <ul className="space-y-3 pt-5">
            {["Careers", "Our Stores", "Our Cares", "Terms & Conditions", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link href="#" className="cursor-pointer underline-offset-2 hover:text-white hover:underline">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <h2 className="text-2xl text-white">Customer Care</h2>
          <ul className="space-y-3 pt-5">
            {["Help Center", "How to Buy", "Track Your Order", "Corporate & Bulk Purchasing", "Returns & Refunds"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="cursor-pointer underline-offset-2 hover:text-white hover:underline">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <h2 className="text-2xl text-white">Contact Us</h2>
          <ul className="space-y-3 pt-5">
            <li>70 Washington Square South, New York, NY 10012, United States</li>
            <li>Email: <a href="mailto:saddaul.siam@gmail.com" className="hover:text-white">saddaul.siam@gmail.com</a></li>
            <li>Phone: <a href="tel:+8801311333277" className="hover:text-white">+88 01311-333277</a></li>
          </ul>

          {/* Social Media Links */}
          <ul className="flex space-x-3 pt-5">
            {[
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              { icon: <FaTwitter />, link: "https://twitter.com" },
              { icon: <FaYoutube />, link: "https://youtube.com" },
              { icon: <FaGoogle />, link: "https://google.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
            ].map(({ icon, link }, index) => (
              <li key={index} className="rounded-full bg-gray-900/60 p-3">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-white text-lg">
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
