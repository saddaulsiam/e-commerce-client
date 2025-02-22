import {
  FaStore,
  FaUsers,
  FaUserTie,
  FaUserEdit,
  FaStoreAlt,
  FaStoreSlash,
} from "react-icons/fa";
import { useState } from "react";
import { BiWindows } from "react-icons/bi";
import { GrChapterAdd, GrNewWindow } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import {
  BsCardList,
  BsLayoutTextWindow,
  BsWindowSidebar,
} from "react-icons/bs";

// local
import { DashboardNavbar } from "../Commone";
import DashboardSideBarNavigation from "../Commone/Dashboard.SideBar.Navigation";
import { SiBrandfolder } from "react-icons/si";

const AdminDashboardLayout = ({ children }) => {
  const [sideBarClose, setSideBarClose] = useState(false);

  const menu = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      href: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: <FaUserTie />,
      children: [
        {
          title: "All Users",
          icon: <FaUsers />,
          href: "/admin/users",
        },
        {
          title: "Manage User",
          icon: <FaUserEdit />,
          href: "/admin/users/id",
        },
      ],
    },
    {
      title: "Vendors",
      icon: <FaStore />,
      children: [
        {
          title: "All Vendors",
          icon: <FaStoreAlt />,
          href: "/admin/vendors",
        },
        {
          title: "Manage Vendor",
          icon: <FaStoreSlash />,
          href: "/admin/vendors/id",
        },
      ],
    },
  ];
  const tools = [
    {
      title: "Banner",
      icon: <BsWindowSidebar />,
      children: [
        {
          title: "All Banner",
          icon: <BsLayoutTextWindow />,
          href: "/admin/banner",
        },
        {
          title: "Add Banner",
          icon: <GrNewWindow />,
          href: "/admin/banner/new",
        },
        {
          title: "Manage Banner",
          icon: <BiWindows />,
          href: "/admin/banner/id",
        },
      ],
    },
    {
      title: "Brand",
      icon: <SiBrandfolder />,
      children: [
        {
          title: "All Brands",
          icon: <BsCardList />,
          href: "/admin/brands",
        },
        {
          title: "Create Brand",
          icon: <GrChapterAdd />,
          href: "/admin/brands/new",
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
          } transition-transform duration-300 
          ${sideBarClose ? "absolute" : "w-80"}`}
        >
          <DashboardSideBarNavigation menu={menu} tools={tools} />
        </div>
        {/* All Content */}
        <div className="w-full">
          {/* Navbar */}
          <DashboardNavbar setSideBarClose={setSideBarClose} />
          <div className="h-[93.4vh] overflow-y-scroll p-5 print:scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
