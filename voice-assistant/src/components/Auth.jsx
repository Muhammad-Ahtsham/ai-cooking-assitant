import { Navigate } from "react-router-dom";
import { useGetMyprofileQuery } from "../../api/user";

const ProtectRoutes = ({ children }) => {
  const { data, error, isLoading } = useGetMyprofileQuery();

  if (isLoading) return <div>Loading</div>;
  if (error) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectRoutes;
