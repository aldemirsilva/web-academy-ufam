import { AuthContext } from "@/app/contexts/AuthContext/AuthProvider";
import { useContext } from "react";

export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error("useAuthContext must be used within an AuthProvider");

  return authContext;
}
