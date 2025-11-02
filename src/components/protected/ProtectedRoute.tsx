// src/components/ProtectedRoute.tsx (NEW FILE)

import React, { useContext } from "react";
import { authContext } from "../../AuthContext";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useContext(authContext);

  if (!auth) {
    // This should technically never happen if your app is wrapped correctly
    return <div>Error: Auth context is not available</div>;
  }

  // If the user is NOT logged in, redirect them to the /login page
  if (!auth.isLoggedIn) {
    // This component renders a redirect
    return <Navigate to="/login" replace />;
  }

  // If the user IS logged in, render the page component
  return <>{children}</>;
};

export default ProtectedRoute;
