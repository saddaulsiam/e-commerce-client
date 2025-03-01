"use client";

import useAuth from "@/hooks/useAuth";
import { auth } from "@/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !loading) {
        router.push(`/login?redirectTo=${pathname}`);
      }
    });

    return () => unsubscribe();
  }, [loading, pathname, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return { children };
};

export default PrivateRoute;
