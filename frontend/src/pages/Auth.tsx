import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

export const Auth = ({
  setShowAuth,
}: {
  setShowAuth: (arg: boolean) => void;
}) => {
  const { user, loading, signup, login } = useUserStore();

  const [auth, setAuth] = useState<"login" | "signup">("login");

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerification, setPasswordVerification] = useState<string>("");

  useEffect(() => {
    if (user) {
      setShowAuth(false);
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth == "login") {
      login({ email, password });
    } else {
      signup({ firstname, lastname, email, password, passwordVerification });
    }
  };

  return (
    <div
      onClick={() => setShowAuth(false)}
      className="fixed inset-0 z-100 flex h-screen w-full items-center justify-center bg-white/70"
    >
      <div className="flex h-screen max-w-6xl items-center justify-center">
        <div
          className="grid h-max grid-cols-1 bg-white shadow-2xl md:grid-cols-2 md:items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="">
            <img
              src="/man_with_headphone.webp"
              alt="man with headphone"
              className="block w-full"
            />
          </div>
          <div className="space-y-4 p-6 lg:px-8 xl:px-16">
            <h2 className="font-poppins text-4xl font-bold">
              {auth == "login" ? "Sign In" : "Sign up"}
            </h2>
            <p>
              {auth == "login"
                ? "Don't have an account yet?"
                : "Already have an account?"}{" "}
              <span
                className="text-yellow cursor-pointer font-medium"
                onClick={() =>
                  auth == "login" ? setAuth("signup") : setAuth("login")
                }
              >
                {auth == "login" ? "Sign Up" : "Sign In"}
              </span>
            </p>
            <form className="space-y-2 xl:space-y-4" onSubmit={handleSubmit}>
              {auth == "signup" && (
                <>
                  <FormInput
                    name="firstname"
                    label="Firstname"
                    value={firstname}
                    placeholder="Your firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <FormInput
                    name="lastname"
                    label="Name"
                    value={lastname}
                    placeholder="Your lastname"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </>
              )}
              <FormInput
                name="email"
                type="email"
                label="Email adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email adress"
              />
              <FormInput
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {auth == "signup" && (
                <FormInput
                  name="passwordVerification"
                  type="password"
                  label="Password Confirmation"
                  value={passwordVerification}
                  onChange={(e) => setPasswordVerification(e.target.value)}
                  placeholder="Confirm your password"
                />
              )}
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
                  <span>{auth == "login" ? "Sign In" : "Sign Up"}</span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
