"use client";

import { Loading } from "@/components/sharedComponents/loader";
import { authKey } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import { auth } from "@/providers/AuthProvider";
import { getFromLocalStorage } from "@/utils/localStorage";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo } from "react";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

interface PrivateRouteProps {
  children: ReactNode;
  role?: "superAdmin" | "admin" | "customer" | "vendor";
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading } = useAuth();
  const token = getFromLocalStorage(authKey.ACCESS_TOKEN);

  const userRole = useMemo(() => {
    if (!token) return null;
    const payload = parseJwt(token);
    return payload?.role || null;
  }, [token]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !loading) {
        router.push(`/login?redirectTo=${pathname}`);
      } else if (user && !loading && role && userRole !== role) {
        router.push("/unauthorized");
      }
    });

    return () => unsubscribe();
  }, [loading, pathname, router, userRole, role]);

  if (loading) {
    return <Loading />;
  }

  if (!token) {
    return null;
  }

  if (role && userRole !== role) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
