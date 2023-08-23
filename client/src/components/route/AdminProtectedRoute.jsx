import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ role, children }) => {
  console.log(`this is the role: ${role}`);
  if (role === "user" || role === undefined) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
