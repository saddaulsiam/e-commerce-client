"use client";

import { DashboardCustomerNavigation } from "@/components/mainComponents/Dashboard/Customer";
import { BottomBar, Footer, Navbar } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { userDashboard } from "@/utils/dashboardMenu";
import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-accent">
      <Navbar />

      <div className="container grid grid-cols-4 gap-6 pt-6">
        {/* Sidebar for larger screens */}
        <aside className="relative hidden lg:col-span-1 lg:block">
          <nav className="rounded-md bg-white p-6 shadow">
            <h2 className="pb-4 text-xl font-bold text-gray-700">Dashboard</h2>
            <DashboardCustomerNavigation navData={userDashboard} />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="col-span-4 min-h-[80vh] px-2 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <h2 className="text-2xl font-semibold text-primary">Dashboard</h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <GiHamburgerMenu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-6 pt-14">
                <h2 className="pb-3 text-xl font-bold text-gray-700">
                  Dashboard
                </h2>
                <DashboardCustomerNavigation navData={userDashboard} />
              </SheetContent>
            </Sheet>
          </div>
          {children}
        </main>
      </div>

      <BottomBar />
      <Footer />
    </div>
  );
};

export default Layout;
