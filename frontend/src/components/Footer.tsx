import { menus } from "@/constants";
import { Link } from "react-router-dom";
import { Section } from "./Section";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#141718]">
      <Section className="px-6 xl:px-16">
        <div>
          <div className="flex items-center gap-y-5 py-8 max-md:flex-col md:justify-between">
            <Link to="/">
              <img src="/white_logo.png" alt="logo" />
            </Link>
            <div className="flex items-center gap-x-10 gap-y-8 max-md:flex-col">
              {menus.map((menu) => (
                <Link
                  key={menu.name}
                  to={menu.href}
                  className="text-[#FEFEFE]/60 hover:text-white"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex justify-center py-6 md:justify-end">
            <p className="text-[#FEFEFE]/60">
              Copyright &copy; {new Date().getFullYear()}{" "}
              <Link
                target="_blank"
                className="underline hover:text-white"
                to="https://falinantenaina.vercel.app/"
              >
                Falinantenaina
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </footer>
  );
};
