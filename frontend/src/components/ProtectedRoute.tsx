import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  role?: string;
};

export function ProtectedRoute({ children, role }: Props) {

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}