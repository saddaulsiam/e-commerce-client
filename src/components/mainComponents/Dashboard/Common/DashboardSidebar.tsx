"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { USER_ROLE } from "@/contants/common";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import {
  getDashboardMenu,
  getDashboardTools,
  NavItem,
} from "@/utils/dashboardMenu";
import { motion } from "framer-motion";
import { ChevronDown, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const DashboardSidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  // Get the user role from Redux state.
  const role = useAppSelector(({ state }) => state.auth.user?.role);

  // Use the utility functions to get the menus.
  const menu: NavItem[] = useMemo(() => getDashboardMenu(role!), [role]);
  const tools: NavItem[] = useMemo(() => getDashboardTools(role!), [role]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const renderMenuItem = (item: NavItem, depth: number = 0) => {
    const isActive =
      pathname === item.href ||
      item.children?.some((child) => child.href === pathname);
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.includes(item.title);

    return (
      <li key={item.title} className="group relative w-full">
        <div
          className={cn(
            "flex items-center rounded-lg px-3 py-2.5 transition-all",
            "hover:bg-primary/5 hover:text-primary",
            isActive
              ? "bg-primary/10 font-semibold text-primary"
              : "text-gray-600",
            isCollapsed ? "justify-center" : "justify-between",
            depth > 0 && "ml-2",
          )}
        >
          <button
            className="flex w-full items-center gap-3"
            onClick={() => {
              if (hasChildren && !isCollapsed) {
                toggleSubmenu(item.title);
              } else if (item.href) {
                router.push(item.href);
              }
            }}
          >
            {/* Icon Container */}
            <div className="relative">
              <span
                className={cn(
                  "flex items-center justify-center rounded-lg bg-primary/5 p-2",
                  isActive ? "bg-primary/10" : "group-hover:bg-primary/10",
                  isCollapsed ? "h-10 w-10" : "w-auto",
                )}
              >
                {item.icon}
              </span>
            </div>

            {/* Non-Collapsed Content */}
            {!isCollapsed && (
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <span className="truncate text-sm">{item.title}</span>
                {hasChildren && (
                  <span className="mt-0.5 text-xs text-gray-400">
                    {item.children?.length}{" "}
                    {item.children?.length === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
            )}
          </button>

          {/* Chevron for Non-Collapsed State */}
          {!isCollapsed && hasChildren && (
            <button
              onClick={() => toggleSubmenu(item.title)}
              className="rounded-lg p-1.5 hover:bg-primary/10"
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gray-400 transition-transform",
                  isSubmenuOpen && "rotate-180",
                )}
              />
            </button>
          )}
        </div>

        {/* Submenu */}
        {hasChildren && !isCollapsed && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: isSubmenuOpen ? "auto" : 0 }}
            className="ml-3 overflow-hidden border-l-2 border-primary/10 pl-4"
          >
            {item.children?.map((child) => renderMenuItem(child, depth + 1))}
          </motion.ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex h-full flex-col border-r border-gray-100 bg-white/95 backdrop-blur-sm">
      {/* Logo Section */}
      <div
        className={`flex h-16 items-center border-b border-gray-100 ${
          isCollapsed ? "pl-2" : "pl-4"
        }`}
      >
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="Logo"
            width={isCollapsed ? 40 : 80}
            height={40}
            className="transition-all duration-300 hover:scale-105"
            priority
          />
        </Link>
      </div>

      {/* User Profile */}
      <div className="group relative mx-3 my-4 flex items-center gap-3 rounded-xl bg-primary/5 p-3">
        <div className="relative">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src="/user-avatar.png" />
            <AvatarFallback className="bg-primary/10">JD</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
        </div>
        {!isCollapsed && (
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium">John Doe</p>
            <p className="truncate text-xs text-primary/60">
              {role === USER_ROLE.admin ? "Admin Account" : "Vendor Account"}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto overflow-x-hidden px-2">
        <div className="space-y-4">
          <section aria-label="Main menu">
            <h3
              className={cn(
                "text-xs font-semibold uppercase tracking-wide text-gray-400",
                isCollapsed ? "sr-only" : "mb-2 px-3",
              )}
            >
              Navigation
            </h3>
            <ul className="space-y-1">
              {menu && menu.map((item) => renderMenuItem(item))}
            </ul>
          </section>

          <Separator className="bg-gray-100" />

          <section aria-label="Tools">
            <h3
              className={cn(
                "text-xs font-semibold uppercase tracking-wide text-gray-400",
                isCollapsed ? "sr-only" : "mb-2 px-3",
              )}
            >
              Tools
            </h3>
            <ul className="space-y-1">
              {tools.map((item) => renderMenuItem(item))}
            </ul>
          </section>
        </div>
      </nav>

      {/* Settings Footer */}
      <div className="border-t border-gray-100 p-2">
        <button
          className={cn(
            "group flex w-full items-center gap-3 rounded-lg p-2.5 transition-all",
            "hover:bg-primary/5 hover:text-primary",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="relative">
            <span
              className={cn(
                "flex items-center justify-center rounded-lg bg-primary/5 p-1.5",
                isCollapsed ? "h-10 w-10" : "w-auto",
              )}
            >
              <Settings className="h-5 w-5" />
            </span>
          </div>

          {!isCollapsed && (
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <span className="truncate text-sm">Workspace Settings</span>
              <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
                New
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
