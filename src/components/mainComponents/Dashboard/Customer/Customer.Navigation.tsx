"use client";

import { NavItem } from "@/utils/dashboardMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TParams = {
  navData: NavItem[];
};

const DashboardCustomerNavigation = ({ navData }: TParams) => {
  const path = usePathname();
  return (
    <ul className="space-y-2">
      {navData.map((nav: NavItem, index: number) => (
        <Link href={nav.href!} key={index}>
          <li
            className={`my-1 flex cursor-pointer items-center space-x-3 rounded-md border-l-4 p-2 pl-4 text-base transition duration-200 ease-in-out hover:bg-gray-100 ${
              path.startsWith(nav.href!)
                ? "border-primary bg-gray-100 text-primary"
                : "border-white text-gray-700 hover:border-primary hover:text-primary"
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
