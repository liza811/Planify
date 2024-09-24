import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

import { auth } from "@/auth";
import { SignOut } from "./sign-out";

export const Sidebar = async () => {
  return (
    <div className="flex flex-col overflow-y-auto pb-4 h-full bg-[#17203F]   ">
      <div className="px-2 pt-2">
        <Logo />
      </div>
      <div className="flex flex-col w-full flex-1 m">
        <SidebarRoutes />
      </div>
      <SignOut />
    </div>
  );
};
