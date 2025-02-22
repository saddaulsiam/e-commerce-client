import { AuthContext, AuthContextType } from "@/providers/AuthProvider";
import { useContext } from "react";

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

export default useAuth;
