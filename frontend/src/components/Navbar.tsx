import { menus } from "@/constants";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  Facebook,
  HeartIcon,
  Instagram,
  LockIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Search,
  Youtube,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cart } from "./Cart";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Navbar = ({
  setShowAuth,
}: {
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, logout } = useUserStore();
  return (
    <nav className="bg-yellow/64 w-full">
      {/* Desktop Navbar */}
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
          <Link to={"/cart"}>
            <Cart />
          </Link>
          {user ? (
            <Link to={"/user"} className="underline">
              {user.lastname}
            </Link>
          ) : (
            <Button onClick={() => setShowAuth(true)}>
              <LogInIcon className="size-4" />
              <span>Sign In</span>
            </Button>
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
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between scroll-auto px-6 py-4 md:px-10 lg:hidden">
        <Sheet>
          <SheetTrigger className="flex gap-x-2">
            <MenuIcon className="size-5" />
            <Link to={"/"}>
              <img src="/logo.png" alt="logo" className="block h-6" />
            </Link>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <SheetTitle>
              <Link to={"/"}>
                <img src="/logo.png" alt="logo" className="block h-6" />
              </Link>
            </SheetTitle>
            <SheetDescription className="sr-only">Navbar menu</SheetDescription>
            <div className="flex h-full flex-col justify-between px-4 pb-4">
              <div>
                <div className="relative">
                  <Input
                    type="search"
                    className="pl-10 text-black/70"
                    placeholder="search"
                  />
                  <Search className="absolute top-1/2 left-2 -translate-y-1/2 text-black/20" />
                </div>
                <div className="flex flex-col">
                  {menus.map((menu) => (
                    <div key={menu.name} className="">
                      <Link className="block py-2" to={menu.href}>
                        {menu.name}
                      </Link>
                      <Separator />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div>
                    <Link to="/cart" className="flex justify-between py-2">
                      <span>Cart</span>
                      <Cart />
                    </Link>
                    <Separator />
                    <Link to="/" className="flex justify-between py-2">
                      <span>Whislist</span>
                      <div className="flex items-center gap-x-1">
                        <HeartIcon className="text-black/60" />
                        <div className="flex size-4 items-center justify-center rounded-full bg-black text-xs text-white">
                          2
                        </div>
                      </div>
                    </Link>
                    <Separator />
                  </div>
                </div>
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to={"/dashboard"}
                      className={cn(buttonVariants(), "w-full")}
                    >
                      <LockIcon />
                      <span>Dashboard</span>
                    </Link>
                    <Button onClick={logout} className="w-full">
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <SheetPrimitive.Close className="w-full">
                    <div
                      onClick={() => setShowAuth(true)}
                      className={cn(buttonVariants(), "w-full")}
                    >
                      Sign In
                    </div>
                  </SheetPrimitive.Close>
                )}
                <div className="flex gap-x-2">
                  <Link to="/">
                    <Instagram />
                  </Link>
                  <Link to="/">
                    <Facebook />
                  </Link>
                  <Link to="/">
                    <Youtube />
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-x-2">
          {user && <Link to={"/"}>{user.lastname}</Link>}
          <Link to="/cart">
            <Cart />
          </Link>
        </div>
      </div>
    </nav>
  );
};
