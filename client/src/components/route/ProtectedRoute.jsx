import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(`this is the user role: ${user?.role}`);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
