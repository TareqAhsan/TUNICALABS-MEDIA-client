import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Spinner variant="success"></Spinner>;
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
