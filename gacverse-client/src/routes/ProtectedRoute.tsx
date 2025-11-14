import { SpinnerLoader } from "@/components/common/Loader";
import { useAuth } from "@/hooks";
import { useAuthStore } from "@/store";
import type React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  const { isAuth } = useAuthStore();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <SpinnerLoader size={50} color="blue" />
      </div>
    );

  if (!isAuth)
    return <Navigate to="/" replace />

  return children;
}

export default ProtectedRoute;
