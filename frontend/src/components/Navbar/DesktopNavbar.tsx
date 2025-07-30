import { menus } from "@/constants";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import { LockIcon, LogInIcon, LogOutIcon, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Cart } from "../Cart";
import { Button, buttonVariants } from "../ui/button";

export const DesktopNavbar = () => {
  const { user, logout } = useUserStore();

  return (
    <div className="flex items-center justify-between py-4.5 max-lg:hidden lg:px-10 xl:px-24 2xl:px-40">
      <Link to="/" className="grow basis-0">
        <img src="/logo.png" alt="logo" />
      </Link>
      <div className="flex grow-2 basis-0 justify-center space-x-4">
        {menus.map((menu, index) => (
          <NavLink
            className="text-black-07 font-grotesk hover:border-black-07 border-b-2 border-transparent"
            key={index}
            to={menu.href}
          >
            {menu.name}
          </NavLink>
        ))}
      </div>
      <div className="flex grow basis-0 items-center justify-end gap-x-4">
        <Search className="size-6" />
        <Cart />
        {user ? (
          <Link to={"/"} className="underline">
            {user.lastname}
          </Link>
        ) : (
          <Link to={"/auth/login"} className={cn(buttonVariants())}>
            <LogInIcon className="size-4" />
            <span>Sign In</span>
          </Link>
        )}

        {user && (
          <>
            {user.role === "admin" && (
              <Link to={"/dashboard"} className={cn(buttonVariants())}>
                <LockIcon />
                <span>Dashboard</span>
              </Link>
            )}
            <Button onClick={logout} className="cursor-pointer">
              <LogOutIcon className="size-4 cursor-pointer" />
              <span>Log Out</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
