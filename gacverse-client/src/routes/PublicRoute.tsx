import { useAuthStore } from "@/store";
import type React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuthStore();
  if (isAuth) 
    return <Navigate to="/dashboard" replace />
    
  return children;
}

export default PublicRoute;
