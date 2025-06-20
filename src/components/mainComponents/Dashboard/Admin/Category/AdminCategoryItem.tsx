"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const AdminCategoryItem = ({
  item,
  level = 0,
}: {
  item: any;
  level?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.subcategories && item.subcategories.length > 0;

  return (
    <div style={{ paddingLeft: `${level * 16}px` }} className="py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mr-2 focus:outline-none"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          )}
          <span className="font-medium text-gray-800">{item.name}</span>
        </div>
      </div>
      {hasChildren && expanded && (
        <div className="mt-1 transition-all duration-300 ease-in-out">
          {item.subcategories.map((child: any, i: number) => (
            <AdminCategoryItem key={i} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategoryItem;
