import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function OperatorGuard({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
}
