"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_ROLE } from "@/contants/common";
import { TUser } from "@/types/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategory } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import CategoriesDropDownContent from "../DropDown/CategoriesDropDownContent";

const NavMegaMenu = ({ isScrolled, user }: { isScrolled: boolean; user: TUser | null }) => {
  const path = usePathname();

  const myAccount = [
    { name: "My Profile", href: "/customer/profile" },
    { name: "My Orders", href: "/customer/orders" },
    { name: "Wishlists", href: "/customer/wishlists" },
    { name: "Support Tickets", href: "/customer/support-tickets" },
    { name: "Payment Methods", href: "/customer/payment-methods" },
  ];

  const vendorAccount = [
    { name: "Dashboard", href: "/vendor/dashboard" },
    { name: "Products", href: "/vendor/products" },
    { name: "Add New Products", href: "/vendor/add-product" },
    { name: "Orders", href: "/vendor/orders" },
    { name: "Accounts Settings", href: "/vendor/account-settings" },
  ];
  return (
    <div className="transform scroll-smooth transition duration-500 xl:container">
      <div className="hidden lg:block">
        <div className={`flex h-14 items-center justify-between ${isScrolled && "hidden"}`}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={`flex cursor-pointer space-x-2 rounded bg-slate-200 px-5 py-2 text-my-gray-200 transition-all ease-in hover:bg-slate-300`}
              >
                <BiCategory className="text-2xl" />
                <p className="font-semibold "> Categories</p>
                <MdKeyboardArrowDown className="text-2xl " />
              </Button>
            </DropdownMenuTrigger>
            {path === "/" ? "" : <CategoriesDropDownContent />}
          </DropdownMenu>
          <div>
            <ul className="font-OpenSans flex items-center space-x-10">
              <Link href={"/"}>
                <li className="cursor-pointer hover:text-primary ">Home</li>
              </Link>

              <Link href={"/"}>
                <li className="cursor-pointer hover:text-primary ">Pages</li>
              </Link>

              {user?.role === USER_ROLE.vendor && (
                <li className="cursor-pointer hover:text-primary">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span>My account</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 ">
                      <DropdownMenuLabel>My account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {vendorAccount.map((item, i) => (
                        <Link href={item.href} key={i}>
                          <DropdownMenuItem className="cursor-pointer">{item.name}</DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              )}

              {user?.role === USER_ROLE.customer && (
                <li className="cursor-pointer hover:text-primary">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span>My account</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 ">
                      <DropdownMenuLabel>My account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {myAccount.map((item, i) => (
                        <Link href={item.href} key={i}>
                          <DropdownMenuItem className="cursor-pointer">{item.name}</DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              )}

              {user?.role == "customer" && (
                <Link href={"/customer/orders"}>
                  <li className="cursor-pointer hover:text-primary ">Track My Order</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMegaMenu;
