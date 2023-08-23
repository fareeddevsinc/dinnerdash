import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin = false, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  console.log(`1`);
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  console.log(`2`);
  return children;
};

export default ProtectedRoute;
