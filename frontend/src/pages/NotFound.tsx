import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-sm max-md:px-4">
      <h1 className="text-yellow text-8xl font-bold md:text-9xl">404</h1>
      <div className="text-yellow my-5 h-1 w-16 rounded md:my-7"></div>
      <p className="text-2xl font-bold text-gray-800 md:text-3xl">
        Page Not Found
      </p>
      <p className="mt-4 max-w-md text-center text-sm text-gray-500 md:text-base">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Link to={"/"} className={cn(buttonVariants())}>
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
