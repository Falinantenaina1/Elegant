import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { loading, signup } = useUserStore();
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordVerification: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(signupData);
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
            Already have an account??{" "}
            <Link to={"/auth/login"} className="text-yellow font-medium">
              Login
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-2 xl:space-y-4">
            <FormInput
              name="firstname"
              label="Firstname"
              value={signupData.firstname}
              onChange={handleChange}
              placeholder="Your firstname"
            />
            <FormInput
              name="lastname"
              label="Name"
              value={signupData.lastname}
              onChange={handleChange}
              placeholder="Your lastname"
            />
            <FormInput
              name="email"
              type="email"
              label="Email adress"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Your email adress"
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <FormInput
              name="passwordVerification"
              type="password"
              label="Password Confirmation"
              value={signupData.passwordVerification}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
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

export default SignUpPage;
