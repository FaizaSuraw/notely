import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token"); // or use context/auth hook

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
