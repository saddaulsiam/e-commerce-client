import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { Bell, LogOut, Settings } from "lucide-react";
import Link from "next/link";

// const notifications = [
//   {
//     id: "1",
//     title: "New Order",
//     description: "Order #1234 has been placed.",
//     time: "2m ago",
//   },
//   {
//     id: "2",
//     title: "Vendor Approved",
//     description: "Vendor John Doe was approved.",
//     time: "1h ago",
//   },
//   {
//     id: "3",
//     title: "Stock Alert",
//     description: "Product ABC is low on stock.",
//     time: "5h ago",
//   },
// ];

const DashboardNavbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { logOut } = useAuth();
  const { user } = useAppSelector(({ state }) => state.auth);

  return (
    <nav
      className={cn(
        isCollapsed ? "left-[72px]" : "left-64",
        "fixed right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 transition-all duration-300 print:hidden",
      )}
    >
      <div className="flex max-w-full items-center gap-3">
        <div className="hidden max-w-full items-baseline gap-2 md:block">
          <h1 className="truncate font-semibold text-gray-900 md:text-xl">
            Welcome Back
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative rounded-lg p-2 outline-none transition-colors hover:bg-gray-100"
              aria-label="Notifications"
              type="button"
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-primary" />
              {/* {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                  {notifications.length}
                </span>
              )} */}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-80 p-2" align="end">
            <DropdownMenuLabel className="text-gray-800">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* {notifications.length > 0 ? (
              notifications.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="flex flex-col items-start space-y-0.5 px-3 py-2 hover:bg-muted"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.description}
                  </span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-gray-500">
                No new notifications
              </div>
            )} */}

            <div className="px-3 py-4 text-center text-sm text-gray-500">
              No new notifications
            </div>
            {/*   <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/admin/notifications"
                className="w-full text-center text-primary hover:underline"
              >
                View All Notifications
              </Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus:outline-none"
            aria-label="Open user menu"
          >
            {/* <div className="relative"> */}
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.profile?.photo || "/user-avatar.jpg"}
                alt="User Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {/* <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
            </div> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <div className="border-b px-3 py-2">
              <p className="text-sm font-semibold text-gray-900">
                {user?.displayName}
              </p>
              <p className="truncate text-xs text-gray-500">{user?.email}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link
                href={`/${user?.role}/settings`}
                className="flex w-full items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={logOut}
              className="flex cursor-pointer items-center gap-2 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
