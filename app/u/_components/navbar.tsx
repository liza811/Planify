import { UserButton } from "@/components/auth/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { getDepartement } from "@/lib/departement";

export const Navbar = async () => {
  const departement = await getDepartement();
  return (
    <div className="border-b p-4 bg-white shadow-sm flex items-center md:flex-row-reverse justify-between h-full w-full">
      <MobileSidebar />
      <UserButton />
      {!!departement && (
        <h1 className="text-lg font-bold text-primary_blue mx-4 md:text-[20px]">
          Département {departement.nom}
        </h1>
      )}
    </div>
  );
};
