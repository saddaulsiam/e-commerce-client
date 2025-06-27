"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TCategory } from "@/types/common";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function AdminCategoryItem({
  item,
  level = 0,
}: {
  item: TCategory;
  level?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.subcategories && item.subcategories.length > 0;

  return (
    <div className="flex flex-col">
      <div
        className={`group flex items-center justify-between py-2 ${level > 0 ? "border-l border-gray-200 pl-4" : ""} transition-colors hover:bg-gray-50`}
      >
        <div className="flex items-center space-x-2">
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-600 hover:text-black focus:outline-none"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          )}

          <span
            className={`font-medium text-gray-800 ${level === 0 ? "text-base" : "text-sm"} `}
          >
            {item.name}
          </span>

          {hasChildren && (
            <Badge variant="secondary" className="text-xs">
              {item.subcategories.length} sub
            </Badge>
          )}
        </div>

        {/* <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div> */}
      </div>

      {hasChildren && expanded && (
        <div
          className={`flex flex-col space-y-2 border-l border-gray-200 pl-4 transition-all duration-300 ease-in-out`}
        >
          {item.subcategories.map((child) => (
            <AdminCategoryItem key={child._id} item={child} level={level + 1} />
          ))}
        </div>
      )}

      {level === 0 && <Separator className="my-2" />}
    </div>
  );
}
