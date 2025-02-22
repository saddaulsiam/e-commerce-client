"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardCustomerNavigation = ({ navData }) => {
  const router = useRouter();

  return (
    <ul>
      {navData.map((nav, index) => (
        <Link href={nav.route} key={index}>
          <li
            className={`my-2 flex cursor-pointer items-center space-x-3 border-l-4 p-1 pl-3 text-base text-my-gray-100 transition duration-200 ease-in-out hover:border-primary hover:text-primary ${
              router.route.split("/")[2] == nav.route.split("/")[2]
                ? "border-l-4 border-primary text-primary"
                : "border-white bg-white text-my-gray-100"
            }`}
          >
            <span className="text-lg">{nav.icon}</span>
            <span>{nav.title}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default DashboardCustomerNavigation;
