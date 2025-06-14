"use client";

import {
  DashboardNavbar,
  DashboardSidebar,
} from "@/components/mainComponents/Dashboard/Common";
import PrivateRoute from "@/providers/PrivateRoute";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

const VendorDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleCollapse = () => {
    setIsTransitioning(true);
    setIsSidebarCollapsed((prev) => !prev);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <aside
            className={`sticky top-0 h-screen transition-all duration-300 ${
              isSidebarCollapsed ? "w-[72px]" : "w-64"
            } bg-white ${
              isTransitioning
                ? "overflow-hidden"
                : "overflow-y-auto overflow-x-hidden"
            }`}
          >
            <DashboardSidebar isCollapsed={isSidebarCollapsed} />
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
            <DashboardNavbar isCollapsed={isSidebarCollapsed} />
            <div className="mt-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-3">
              {children}
            </div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default VendorDashboardLayout;
