"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary py-2 text-sm text-white">
      <div className="container mx-auto flex items-center justify-between">
        <p>🎉 Free shipping on orders over $50! Shop now.</p>
        <Button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:opacity-80"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
