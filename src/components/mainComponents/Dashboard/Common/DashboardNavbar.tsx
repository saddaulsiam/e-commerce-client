import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authKey } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import { logOutUser } from "@/redux/features/auth/authSlice";
import { removeOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { removeFromLocalStorage } from "@/utils/localStorage";
import { Bell, Settings, Users } from "lucide-react";
import Link from "next/link";

const DashboardNavbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const dispatch = useAppDispatch();
  const { logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    dispatch(logOutUser());
    dispatch(removeOrderDetails());
    removeFromLocalStorage(authKey.ACCESS_TOKEN);
  };

  return (
    <nav
      className={`fixed ${isCollapsed ? "left-[72px]" : "left-64"} right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4`}
    >
      <div className="flex max-w-full items-center gap-3">
        <div className="hidden max-w-full items-baseline gap-2 md:block">
          <h1 className="truncate font-semibold text-gray-900 md:text-xl">
            Welcome Back
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative rounded-lg p-2 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
            3 {/* Replace with dynamic value */}
          </span>
        </button>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus:outline-none"
            aria-label="User menu"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="/user-avatar.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
              <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex w-full items-center gap-2">
                <Users className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogOut}
              className="flex items-center gap-2 text-red-600"
            >
              <Settings className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
