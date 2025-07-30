import { menus } from "@/constants";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";
import {
  Facebook,
  HeartIcon,
  Instagram,
  LockIcon,
  MenuIcon,
  Search,
  ShoppingCart,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Cart } from "../Cart";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const MobileNavbar = () => {
  const { user, logout } = useUserStore();

  return (
    <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:hidden">
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
                  <Link to="/" className="flex justify-between py-2">
                    <span>Cart</span>
                    <div className="flex items-center gap-x-1">
                      <ShoppingCart className="text-black/60" />
                      <div className="flex size-4 items-center justify-center rounded-full bg-black text-xs text-white">
                        2
                      </div>
                    </div>
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
                <Link
                  to="/auth/login"
                  className={cn(buttonVariants(), "w-full")}
                >
                  Sign In
                </Link>
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
        <Cart />
      </div>
    </div>
  );
};
