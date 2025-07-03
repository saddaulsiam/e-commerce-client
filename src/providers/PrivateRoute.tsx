"use client";

import { Loading } from "@/components/sharedComponents/loader";
import { authKey, USER_ROLE } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import { auth } from "@/providers/AuthProvider";
import { getFromLocalStorage } from "@/utils/localStorage";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo } from "react";

// Simple JWT decoder (no validation, just decoding)
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

interface PrivateRouteProps {
  children: ReactNode;
  role: "superAdmin" | "admin" | "customer" | "vendor";
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading } = useAuth();
  const token = getFromLocalStorage(authKey.ACCESS_TOKEN);

  // Decode role from token
  const userRole = useMemo(() => {
    if (!token) return null;
    const payload = parseJwt(token);
    return payload?.role || null;
  }, [token]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !loading) {
        router.push(`/login?redirectTo=${pathname}`);
      } else if (user && !loading && userRole !== role) {
        router.push("/unauthorized"); // or any unauthorized page
      }
    });

    return () => unsubscribe();
  }, [loading, pathname, router, userRole, role]);

  if (loading) {
    return <Loading />;
  }

  // If not authenticated or role doesn't match, don't render children
  if (!token || userRole !== role) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
