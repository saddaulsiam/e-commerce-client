"use client";

import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary py-2 text-sm text-white">
      <div className="container mx-auto flex items-center justify-between ">
        <p>🎉 Free shipping on orders over $50! Shop now.</p>
        <button onClick={() => setIsVisible(false)} className="p-1 hover:opacity-80">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
