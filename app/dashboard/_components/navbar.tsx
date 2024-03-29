import { UserButton } from "@/components/auth/user-button";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="border-b p-4 bg-white shadow-sm flex items-center md:flex-row-reverse justify-between h-full w-full">
      <MobileSidebar />
      <UserButton />
    </div>
  );
};
