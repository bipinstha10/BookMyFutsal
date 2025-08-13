import { Navigate } from "react-router-dom";
import { can } from "../data/auth";
import type { User } from "../data/users";

type ProtectedRouteProps = {
  user: User | null; // logged-in user
  action: string; // required permission
  children: TSX.Element; // page to render if allowed
};

const ProtectedRoute = ({ user, action, children }: ProtectedRouteProps) => {
  if (!user) {
    // Not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (!can(user, action)) {
    // Logged in but missing permission → redirect to "no access"
    return <Navigate to="/no-access" replace />;
  }

  // Allowed → render page
  return children;
};

export default ProtectedRoute;
