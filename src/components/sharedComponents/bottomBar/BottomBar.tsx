"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCart, BiHomeAlt } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";

const BottomBar = () => {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home", icon: <BiHomeAlt className="h-5 w-5" /> },
    { href: "/cart", label: "Cart", icon: <BiCart className="h-5 w-5" /> },
    {
      href: "/profile",
      label: "Account",
      icon: <MdOutlineAccountCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-1 left-1/2 z-50 w-[95%] -translate-x-1/2 rounded-full bg-accent lg:hidden">
      <ul className="flex justify-around p-3">
        {navItems.map(({ href, label, icon }) => (
          <Link key={href} href={href}>
            <li
              className={`flex cursor-pointer flex-col items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105 ${
                pathname === href
                  ? "font-semibold text-primary"
                  : "text-gray-600"
              }`}
            >
              {icon}
              <p className="mt-1 text-xs font-semibold">{label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
