"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav className={cn(`flex space-x-0.5 text-xs md:text-sm`, className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary-dark text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="ml-0.5 text-gray-500">/</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
