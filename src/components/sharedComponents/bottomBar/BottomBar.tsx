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
    <div className="fixed bottom-4 left-1/2 z-50 w-[90%] -translate-x-1/2 rounded-2xl bg-white shadow-lg lg:hidden">
      <ul className="flex items-center justify-around p-2 text-primary/80">
        {navItems.map(({ href, label, icon }) => (
          <Link key={href} href={href}>
            <li
              className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl p-3 transition-all ${
                pathname === href
                  ? "bg-gray-100 text-primary"
                  : "hover:text-primary"
              }`}
            >
              {icon} <p className="text-xs">{label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
