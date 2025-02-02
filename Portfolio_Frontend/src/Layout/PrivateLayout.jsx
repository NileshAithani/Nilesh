import Sidebar from "@/pages/Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateLayout = () => {
  const token = Cookies.get("token"); // Retrieve the token from cookies
  console.log("Token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
