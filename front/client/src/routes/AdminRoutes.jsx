import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const AdminRoutes = () => {
  const { isAuth } = useSelector((state) => state.user);
  const { userInfo, loading } = useSelector((state) => state.user);

  return isAuth && userInfo?.role == "ADMIN"  ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoutes;
