import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Section } from "./Section";
import { buttonVariants } from "./ui/button";

export const Hero = () => {
  return (
    <Section>
      <div className="bg-yellow/64 relative max-h-[43.25rem] min-h-[28.5rem] w-full md:max-h-[51.25rem]">
        <img
          src="/hero_lg.webp"
          alt="hero"
          className="max-h-[51.25rem] w-full object-cover max-md:hidden"
        />
        <img
          src="/hero.webp"
          alt="hero"
          className="h-[43.25rem] w-full object-cover md:hidden"
        />
        <div className="absolute inset-0 px-6 md:top-1/2 md:left-1/2 md:-translate-y-1/2">
          <div className="flex flex-col items-center pt-10 md:items-start">
            <h1 className="max-md:text-center">
              Listen to <br />
              the <span className="text-[#377DFF]">amazing</span>
              <br />
              music sound.
            </h1>
            <p className="mt-2 lg:text-xl">
              Experience music like never before
            </p>
            <Link
              to={"/"}
              className={cn(buttonVariants({ size: "lg" }), "mt-4 xl:mt-6")}
            >
              Shopping Now
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};
