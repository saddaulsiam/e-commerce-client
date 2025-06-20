"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;
  return (
    <div className="bg-primary text-sm text-white">
      <div className="container flex items-center justify-between">
        <p>🎉 Free shipping on orders over $50! Shop now.</p>
        <div className="flex items-center gap-x-8">
          <Link href="/register-as-vendor">Join as vendor</Link>
          <Button onClick={() => setIsVisible(false)}>
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
