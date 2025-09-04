import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = auth.currentUser;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
