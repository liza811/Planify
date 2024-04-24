import { UserButton } from "@/components/auth/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { Notifications } from "./notifications";
import { getNotificationsByUser } from "@/lib/notifications";

export const Navbar = async () => {
  const notificaions = await getNotificationsByUser();

  return (
    <div className="border-b p-4 bg-white shadow-sm flex items-center md:flex-row-reverse justify-between h-full w-full">
      <MobileSidebar />
      <div className="flex gap-x-6 items-center">
        <Notifications mesNotifications={notificaions} />

        <UserButton />
      </div>
    </div>
  );
};
