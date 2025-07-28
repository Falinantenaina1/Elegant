import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { loading, login } = useUserStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginData);
  };
  return (
    <div className="mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
        <div className="size-full">
          <img
            src="/man_with_headphone.webp"
            alt="man-with-headphone"
            className="size-full"
          />
        </div>
        <div className="space-y-4 p-6 lg:px-8 xl:px-16">
          <h2 className="font-poppins text-4xl font-bold">Sign In</h2>
          <p>
            Don't have an account yet?{" "}
            <Link to={"/auth/signup"} className="text-yellow font-medium">
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-2 xl:space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email adress</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={loginData.email}
                placeholder="Your email adress"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={loginData.password}
                required
                autoComplete=""
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              size={"lg"}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex animate-pulse items-center gap-x-1">
                  <LoaderCircle className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
