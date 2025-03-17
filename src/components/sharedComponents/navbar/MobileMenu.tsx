"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_ROLE } from "@/contants/common";
import { myAccount, vendorAccount } from "@/data/navbar.navigation";
import { TUser } from "@/types/common";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

const MobileMenu = ({ user }: { user: TUser | null }) => {
  return (
    <div className="z-10 lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 text-gray-700 hover:text-primary">
          <FiMenu className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          sideOffset={15}
          className="w-48 space-y-2"
        >
          <DropdownMenuItem>
            <Link
              href="/"
              className="w-full text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/shop"
              className="w-full text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Shop
            </Link>
          </DropdownMenuItem>

          {user?.role === USER_ROLE.customer ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="w-full text-sm font-medium text-gray-700 hover:bg-gray-100">
                My account
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48 space-y-0.5">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {myAccount.map((item, i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer">
                      <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : user?.role === USER_ROLE.vendor ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="w-full text-sm font-medium text-gray-700 hover:bg-gray-100">
                My account
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48 space-y-0.5">
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {vendorAccount.map((item, i) => (
                    <DropdownMenuItem key={i} className="cursor-pointer">
                      <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            ""
          )}

          {user?.role == "customer" && (
            <DropdownMenuItem>
              <Link
                href="/orders"
                className="w-full text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Track My Order
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default MobileMenu;
