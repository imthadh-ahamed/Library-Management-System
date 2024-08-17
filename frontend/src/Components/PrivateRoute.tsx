import React from "react";
import { Navigate } from "react-router-dom";

// Define the props for the PrivateRoute component
interface PrivateRouteProps {
  element: React.ReactNode;
  isAuthenticated: boolean;
}

// PrivateRoute component
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  // Destructure the props
  element,
  // Check if the user is authenticated
  isAuthenticated,
}) => {
  // If the user is authenticated, return the element
  return isAuthenticated ? <>{element}</> : <Navigate to="/" replace />;
};
