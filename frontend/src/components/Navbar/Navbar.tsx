import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar = () => {
  return (
    <nav className="bg-yellow/64 w-full">
      <DesktopNavbar />
      <MobileNavbar />
    </nav>
  );
};
