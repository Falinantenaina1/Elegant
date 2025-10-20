import { Section } from "@/components/Section";
import { useOrderStore } from "@/stores/useOrderStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import NotFound from "./NotFound";

const UserPage = () => {
  const { user, logout } = useUserStore();

  const { getUserOrder } = useOrderStore();

  useEffect(() => {
    getUserOrder();
  }, [getUserOrder]);

  if (!user) return <NotFound />;

  return (
    <Section className="section">
      <h2 className="h2">My Account</h2>
      <div className="flex gap-x-4 max-md:flex-col">
        {/* User Card */}
        <div className="w-full bg-[#F3F5F7] p-4 md:w-[16rem]">
          <div className="flex flex-col items-center space-y-2">
            <div className="size-20 rounded-full bg-gray-900"></div>
            <h3>{user?.lastname}</h3>
          </div>
          {/* User Tabs */}
          <div className="flex flex-col space-y-4">
            <NavLink
              to={"/user"}
              className={({ isActive }) =>
                isActive ? "font-bold" : "hover:text-bold font-normal"
              }
            >
              Account
            </NavLink>
            <NavLink
              to={"/user/address"}
              className={({ isActive }) =>
                isActive ? "font-bold" : "hover:text-bold font-normal"
              }
            >
              Address
            </NavLink>
            <NavLink
              to={"/user/orders"}
              className={({ isActive }) =>
                isActive ? "font-bold" : "hover:text-bold font-normal"
              }
            >
              Orders
            </NavLink>
            <Link to={"/"} onClick={logout}>
              Logout
            </Link>
          </div>
        </div>
        {/*User Information*/}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </Section>
  );
};

export default UserPage;
