import { useAuth } from "../../hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

/**
 * Wrap content that should only be accessible to logged-in users.
 * Redirects to /login if not authenticated.
 */
export function AuthGuard({ children }: Props) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
