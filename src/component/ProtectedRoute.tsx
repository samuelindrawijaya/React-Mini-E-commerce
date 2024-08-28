import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log("protect", isAuthenticated);

  if (isAuthenticated) {
    console.log("Accessing protected route");
    return <Outlet />;
  } else {
    console.log("Redirecting to login");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
