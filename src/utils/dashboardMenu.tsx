"use client";

import { USER_ROLE } from "@/constants/common";
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
  StoreIcon,
  Tag,
  Users,
} from "lucide-react";
import React from "react";
import { BiStore } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineAccountCircle } from "react-icons/md";

export type NavItem = {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavItem[];
};

export function getDashboardMenu(role: string): NavItem[] {
  if (role === USER_ROLE.CUSTOMER) {
    return [
      {
        title: "Orders",
        icon: <BsBag className="h-5 w-5" />,
        href: "/orders",
      },
      {
        title: "Profile Info",
        icon: <MdOutlineAccountCircle className="h-5 w-5" />,
        href: "/profile",
      },
      {
        title: "Addresses",
        icon: <HiOutlineLocationMarker className="h-5 w-5" />,
        href: "/addresses",
      },
    ];
  } else if (role === USER_ROLE.ADMIN) {
    return [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        href: "/admin/dashboard",
      },
      {
        title: "Reports",
        icon: <BarChart2 className="h-5 w-5" />,
        href: "/admin/reports",
      },
      {
        title: "Products",
        icon: <Package className="h-5 w-5" />,
        href: "/admin/products",
      },
      {
        title: "Orders",
        icon: <ShoppingCart className="h-5 w-5" />,
        href: "/admin/orders",
      },
      {
        title: "Customers",
        icon: <Users className="h-5 w-5" />,
        href: "/admin/customers",
      },
      {
        title: "Admin",
        icon: <Settings className="h-5 w-5" />,
        children: [
          {
            title: "All Admin",
            icon: <Settings className="h-5 w-5" />,
            href: "/admin/all",
          },
          {
            title: "Create New",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/admin/new",
          },
        ],
      },
      {
        title: "Vendors",
        icon: <StoreIcon className="h-5 w-5" />,
        children: [
          {
            title: "All Vendors",
            icon: <StoreIcon className="h-5 w-5" />,
            href: "/admin/vendors",
          },
          {
            title: "New Requests",
            icon: <BiStore className="h-5 w-5" />,
            href: "/admin/vendors/new",
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
        icon: <Folder className="h-5 w-5" />,
        children: [
          {
            title: "All Categories",
            icon: <Folder className="h-5 w-5" />,
            href: "/admin/categories",
          },
          {
            title: "Create New",
            icon: <PlusCircle className="h-5 w-5" />,
            href: "/admin/categories/new",
          },
        ],
      },
    ];
  } else if (role === USER_ROLE.VENDOR) {
    return [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
        href: "/vendor/dashboard",
      },
      {
        title: "Reports",
        icon: <BarChart2 className="h-5 w-5" />,
        href: "/vendor/reports",
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
        title: "Customers",
        icon: <Users className="h-5 w-5" />,
        href: "/vendor/customers",
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
          href: role === USER_ROLE.ADMIN ? "/admin/themes" : "/vendor/themes",
        },
        {
          title: "Templates",
          icon: <PlusCircle className="h-5 w-5" />,
          href:
            role === USER_ROLE.ADMIN ? "/admin/templates" : "/vendor/templates",
        },
      ],
    },
  ];
}
