"use client";

import {
  DashboardNavbar,
  DashboardSidebar,
} from "@/components/mainComponents/Dashboard/Common";
import {
  Ban,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutDashboard,
  Package,
  Palette,
  PlusCircle,
  ShoppingCart,
  UploadCloud,
} from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

const VendorDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCollapse = () => {
    setIsTransitioning(true);
    setIsSidebarCollapsed((prev) => !prev);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const menu = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        href: "/vendor/dashboard",
      },
      {
        title: "Products",
        icon: <Package className="h-5 w-5" />,
        children: [
          {
            title: "All Products",
            icon: <Layers className="h-5 w-5" />,
            href: "/vendor/products",
          },
          {
            title: "Add Product",
            icon: <UploadCloud className="h-5 w-5" />,
            href: "/vendor/products/new",
          },
        ],
      },
      {
        title: "Orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        href: "/vendor/orders",
      },
      {
        title: "Brands",
        icon: <Ban className="h-5 w-5" />,
        href: "/vendor/brands",
      },
    ],
    [],
  );

  const tools = useMemo(
    () => [
      {
        title: "Customization",
        icon: <Palette className="h-5 w-5" />,
        children: [
          {
            title: "Themes",
            icon: <Palette className="h-5 w-5" />,
            href: "/vendor/themes",
          },
          {
            title: "Templates",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/vendor/templates",
          },
        ],
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside
          className={`sticky top-0 h-screen transition-all duration-300 ${
            isSidebarCollapsed ? "w-[72px]" : "w-64"
          } bg-white ${isTransitioning ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"}`}
        >
          <DashboardSidebar
            menu={menu}
            tools={tools}
            isCollapsed={isSidebarCollapsed}
          />
          <button
            onClick={handleCollapse}
            className="absolute -right-3 top-5 rounded-full border border-gray-100 bg-white p-1.5 shadow-md hover:bg-gray-50"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </aside>
        <main className="min-w-0 flex-1">
          <DashboardNavbar />
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboardLayout;
