import { UserButton } from "@/components/auth/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { Notifications } from "./notifications";
import { getNotificationsByUser } from "@/lib/notifications";
import { getDepartement } from "@/lib/departement";

export const Navbar = async () => {
  const notificaions = await getNotificationsByUser();
  const departement = await getDepartement();

  return (
    <div className="border-b p-4 bg-white shadow-sm flex items-center md:flex-row-reverse justify-between h-full w-full">
      <MobileSidebar />
      <div className="flex gap-x-6 items-center">
        <Notifications mesNotifications={notificaions} />

        <UserButton />
      </div>
      {!!departement && (
        <h1 className="text-lg font-bold text-primary_blue mx-4 md:text-[20px]">
          Département {departement.nom}
        </h1>
      )}
    </div>
  );
};
