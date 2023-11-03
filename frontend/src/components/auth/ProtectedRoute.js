import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  selectAuthData,
  selectUserType,
} from "../../features/auth/authSlice";
const ProtectedRoute = ({ typeAllowed, redirectPath }) => {
  const authenticated = useSelector(isAuthenticated) !== null;
  const userType = useSelector(selectUserType);
  const navigate = useNavigate();

  if (!authenticated) {
    console.log("NOT AUTH");
    return null; // Don't render anything if not authenticated
  }

  if (userType !== typeAllowed) {
    return navigate(redirectPath);
  }

  return <Outlet />;
};

export default ProtectedRoute;
