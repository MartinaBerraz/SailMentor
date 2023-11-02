import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, selectUserType } from "../../features/auth/authSlice";
const ProtectedRoute = ({
  typeAllowed,
  redirectPath = "/signIn",
  children,
}) => {
  const authenticated = useSelector(isAuthenticated) !== null;
  const userType = useSelector(selectUserType);

  if (!authenticated || userType !== typeAllowed) {
    return <Navigate to={redirectPath} replace />;
  } else {
    console.log("STRANGEE");
    console.log(userType);
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
