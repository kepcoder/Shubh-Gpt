import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    // agar token nahi hai to login pe bhej do
    return <Navigate to="/ai/login" replace />;
  }

  // token hai to children dikhado
  return children;
};

export default ProtectedRoute;
