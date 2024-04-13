"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Dialog } from "../ui/dialog";

import { logout } from "@/actions/logout";
import { stringToColor } from "@/lib/utils";

export const UserButton = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <Dialog>
      <DropdownMenu>
        <div className="flex items-center flex-row-reverse gap-x-2 hover:bg-neutral-100 p-1.5 px-3 rounded-md">
          <DropdownMenuTrigger className=" outline-none">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback
                className="bg-primary_purpule"
                // style={{
                //   backgroundColor: user?.emails
                //     ? stringToColor(user?.email![0] || "")
                //     : `#5454dd`,
                // }}
              >
                <span className="flex items-center justify-center font-bold text-white text-[20px]">
                  {user?.email ? (
                    `${user.email[0]}`
                  ) : (
                    <User className="text-white h-5 w-5 " />
                  )}
                </span>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <p>
            {user?.nom} {user?.prenom}
          </p>
        </div>
        <DropdownMenuContent className="w-56 mr-2 ">
          <DropdownMenuLabel className="flex items-center text-[16px]">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-[15px] flex items-center cursor-pointer"
            onClick={onClick}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};
