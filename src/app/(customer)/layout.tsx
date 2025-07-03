"use client";

import { CustomerNavigation } from "@/components/mainComponents/Dashboard/Customer";
import { BottomBar, Footer, Navbar } from "@/components/sharedComponents";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PrivateRoute from "@/providers/PrivateRoute";
import { useAppSelector } from "@/redux/hooks";
import { getDashboardMenu, NavItem } from "@/utils/dashboardMenu";
import { ReactNode, useMemo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector(({ state }) => state.auth);
  const menu: NavItem[] = useMemo(
    () => getDashboardMenu(user?.role as string),
    [user?.role],
  );
  return (
    <PrivateRoute role="customer">
      <div className="bg-accent">
        <Navbar />

        <div className="container grid grid-cols-4 gap-6 pt-6">
          {/* Sidebar for larger screens */}
          <aside className="relative hidden lg:col-span-1 lg:block">
            <nav className="rounded-md bg-white p-6 shadow">
              <h2 className="pb-4 text-xl font-bold text-gray-700">
                Dashboard
              </h2>
              <CustomerNavigation navData={menu} />
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
                  <CustomerNavigation navData={menu} />
                </SheetContent>
              </Sheet>
            </div>
            {children}
          </main>
        </div>

        <BottomBar />
        <Footer />
      </div>
    </PrivateRoute>
  );
};

export default Layout;
