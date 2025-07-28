import { useUserStore } from "@/stores/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const user = useUserStore((s) => s.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Auth;
