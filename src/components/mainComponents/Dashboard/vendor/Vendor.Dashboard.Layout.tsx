"use client";
import { useState } from "react";
import { GrChapterAdd } from "react-icons/gr";
import { SiBrandfolder } from "react-icons/si";
import { AiOutlineSetting } from "react-icons/ai";
import { BsCart2, BsUpload, BsCardText, BsCardList } from "react-icons/bs";

// local
import { DashboardNavbar, DashboardSideBarNavigation } from "../Commone";
import { MdDashboard } from "react-icons/md";

const VendorDashboardLayout = ({ children }) => {
  const [sideBarClose, setSideBarClose] = useState(false);

  const menu = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      href: "/vendor/dashboard",
    },
    {
      title: "Products",
      icon: <BsCardText />,
      children: [
        {
          title: "All Products",
          icon: <BsCardText />,
          href: "/vendor/products",
        },
        {
          title: "Add Product",
          icon: <BsUpload />,
          href: "/vendor/products/new",
        },
      ],
    },
    {
      title: "Orders",
      icon: <BsCart2 />,
      href: "/vendor/orders",
    },
    {
      title: "Settings",
      icon: <AiOutlineSetting />,
      href: "/vendor/settings",
    },
  ];
  const tools = [
    {
      title: "Brand",
      icon: <SiBrandfolder />,
      children: [
        {
          title: "All Brands",
          icon: <BsCardList />,
          href: "/vendor/brands",
        },
        {
          title: "Create Brand",
          icon: <GrChapterAdd />,
          href: "/vendor/brands/new",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="flex">
        {/* Side bar Navigation*/}
        <div
          className={`h-screen ${
            sideBarClose ? "-translate-x-full" : "translate-x-0"
          } transition-transform duration-300 ${sideBarClose ? "absolute" : "w-80"}`}
        >
          <DashboardSideBarNavigation menu={menu} tools={tools} />
        </div>
        {/* All Content */}
        <div className="w-full">
          {/* Navbar */}
          <DashboardNavbar setSideBarClose={setSideBarClose} />
          <div className="print:scrollbar-hide h-[93.4vh] overflow-y-scroll p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardLayout;
