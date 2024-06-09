import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

import { auth } from "@/auth";
import { SignOut } from "./sign-out";

export const Sidebar = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col overflow-y-auto pb-4 h-full bg-[#17203F]   ">
      <div className="p-4 pb-0">
        <Logo />
      </div>
      <div className="flex flex-col w-full flex-1 -mt-6">
        <SidebarRoutes />
      </div>
      <SignOut />
    </div>
  );
};
