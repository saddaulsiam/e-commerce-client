"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../providers/AuthProvider";
import useAuth from "../../../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { isLoading } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !isLoading) {
        router.push(`/login?redirectTo=${router.asPath}`);
      }
    });

    return () => unsubscribe();
  }, [isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
