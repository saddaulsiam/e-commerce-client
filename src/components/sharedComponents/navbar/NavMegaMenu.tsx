"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { USER_ROLE } from "@/contants/common";
import { myAccount, vendorAccount } from "@/data/navbar.navigation";
import { TUser } from "@/types/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategory } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import CategoriesDropDownContent from "../DropDown/CategoriesDropDownContent";

type TProps = {
  isScrolled: boolean;
  user: TUser | null;
};

const NavMegaMenu = ({ isScrolled, user }: TProps) => {
  const path = usePathname();

  return (
    <div className="relative z-50 transform scroll-smooth transition duration-500 xl:container">
      <div className="hidden lg:block">
        <div
          className={`flex h-14 items-center justify-between ${isScrolled && "hidden"}`}
        >
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex cursor-pointer space-x-2 rounded bg-slate-200 px-5 py-2 text-my-gray-200 transition-all ease-in hover:bg-slate-300">
                <BiCategory className="text-2xl" />
                <p className="font-semibold"> Categories</p>
                <MdKeyboardArrowDown className="text-2xl" />
              </Button>
            </DropdownMenuTrigger>
            {path === "/" ? null : <CategoriesDropDownContent />}
          </DropdownMenu>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home Link */}
              <NavigationMenuItem>
                <Link href="/" passHref legacyBehavior>
                  <NavigationMenuLink asChild>
                    <a className={navigationMenuTriggerStyle()}>Home</a>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Shop Link */}
              <NavigationMenuItem>
                <Link href="/product" passHref legacyBehavior>
                  <NavigationMenuLink asChild>
                    <a className={navigationMenuTriggerStyle()}>Shop</a>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* My Account Dropdown - Vendor */}
              {user?.role === USER_ROLE.vendor && (
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger>My Account</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 z-50 flex min-w-48 flex-col gap-y-1 rounded-md border bg-white p-1.5 shadow-md">
                    <Label className="cursor-auto p-1 pl-2 text-sm">
                      My Account
                    </Label>
                    <Separator />
                    {vendorAccount.map((item, i) => (
                      <Link href={item.href} passHref legacyBehavior key={i}>
                        <NavigationMenuLink asChild>
                          <a className="p-1 pl-2 text-sm transition-all duration-100 ease-in hover:bg-accent hover:text-primary">
                            {item.name}
                          </a>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {/* My Account Dropdown - Customer */}
              {user?.role === USER_ROLE.customer && (
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger>My Account</NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 z-50 flex min-w-48 flex-col gap-y-1 rounded-md border bg-white p-1.5 shadow-md">
                    <Label className="cursor-auto p-1 pl-2 text-sm">
                      My Account
                    </Label>
                    <Separator />
                    {myAccount.map((item, i) => (
                      <Link href={item.href} passHref legacyBehavior key={i}>
                        <NavigationMenuLink asChild>
                          <a className="p-1 pl-2 text-sm transition-all duration-100 ease-in hover:bg-accent hover:text-primary">
                            {item.name}
                          </a>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}

              {/* Track My Order - Customer Only */}
              {user?.role === USER_ROLE.customer && (
                <NavigationMenuItem>
                  <Link href="/customer/orders" passHref legacyBehavior>
                    <NavigationMenuLink asChild>
                      <a className={navigationMenuTriggerStyle()}>
                        Track My Order
                      </a>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default NavMegaMenu;
