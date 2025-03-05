"use client";

import { USER_ROLE } from "@/contants/common";
import {
  BarChart2,
  CheckCircle,
  Clock,
  Folder,
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  ShoppingCart,
  Tag,
  Users,
} from "lucide-react";
import React from "react";

export type NavItem = {
  title: string;
  icon: React.ReactNode;
  href?: string;
  children?: NavItem[];
};

export function getDashboardMenu(role: string): NavItem[] {
  if (role === USER_ROLE.admin) {
    return [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        href: "/admin/dashboard",
      },
      {
        title: "Vendors",
        icon: <Users className="h-5 w-5" />,
        href: "/admin/vendors",
      },
      {
        title: "Products",
        icon: <Package className="h-5 w-5" />,
        children: [
          {
            title: "All Products",
            icon: <Package className="h-5 w-5" />,
            href: "/admin/products",
          },
          {
            title: "Add Product",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/admin/products/new",
          },
          {
            title: "Categories",
            icon: <Folder className="h-5 w-5" />,
            href: "/vendor/products/categories",
          },
        ],
      },
      {
        title: "Orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        children: [
          {
            title: "Pending Orders",
            icon: <Clock className="h-5 w-5" />,
            href: "/admin/orders/pending",
          },
          {
            title: "Completed Orders",
            icon: <CheckCircle className="h-5 w-5" />,
            href: "/admin/orders/completed",
          },
        ],
      },
      {
        title: "Brands",
        icon: <Tag className="h-5 w-5" />,
        children: [
          {
            title: "All Brands",
            icon: <Tag className="h-5 w-5" />,
            href: "/admin/brands",
          },
          {
            title: "Create New",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/admin/brands/new",
          },
        ],
      },
      {
        title: "Categories",
        icon: <Tag className="h-5 w-5" />,
        children: [
          {
            title: "All Categories",
            icon: <Tag className="h-5 w-5" />,
            href: "/admin/categories",
          },
          {
            title: "Create Category",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/admin/categories/new",
          },
        ],
      },
      {
        title: "Customers",
        icon: <Users className="h-5 w-5" />,
        href: "/admin/customers",
      },
      {
        title: "Reports",
        icon: <BarChart2 className="h-5 w-5" />,
        href: "/admin/reports",
      },
      {
        title: "Account Settings",
        icon: <Settings className="h-5 w-5" />,
        href: "/admin/settings",
      },
    ];
  } else if (role === USER_ROLE.vendor) {
    return [
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
            icon: <Package className="h-5 w-5" />,
            href: "/vendor/products",
          },
          {
            title: "Add Product",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/vendor/products/new",
          },
        ],
      },
      {
        title: "Orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        children: [
          {
            title: "Pending Orders",
            icon: <Clock className="h-5 w-5" />,
            href: "/vendor/orders/pending",
          },
          {
            title: "Completed Orders",
            icon: <CheckCircle className="h-5 w-5" />,
            href: "/vendor/orders/completed",
          },
        ],
      },
      {
        title: "Brands",
        icon: <Tag className="h-5 w-5" />,
        children: [
          {
            title: "All Brands",
            icon: <Tag className="h-5 w-5" />,
            href: "/vendor/brands",
          },
          {
            title: "Create New",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/vendor/brands/new",
          },
        ],
      },
      {
        title: "Customers",
        icon: <Users className="h-5 w-5" />,
        href: "/vendor/customers",
      },
      {
        title: "Reports",
        icon: <BarChart2 className="h-5 w-5" />,
        href: "/vendor/reports",
      },
      {
        title: "Account Settings",
        icon: <Settings className="h-5 w-5" />,
        href: "/vendor/settings",
      },
    ];
  }
  return [];
}

export function getDashboardTools(role: string): NavItem[] {
  return [
    {
      title: "Customization",
      icon: <Settings className="h-5 w-5" />,
      children: [
        {
          title: "Themes",
          icon: <Folder className="h-5 w-5" />,
          href: role === USER_ROLE.admin ? "/admin/themes" : "/vendor/themes",
        },
        {
          title: "Templates",
          icon: <PlusCircle className="h-5 w-5" />,
          href:
            role === USER_ROLE.admin ? "/admin/templates" : "/vendor/templates",
        },
      ],
    },
  ];
}
