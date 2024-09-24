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

export const UserButton = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <Dialog>
      <DropdownMenu>
        <div className="flex items-center flex-row-reverse gap-x-1 md:gap-x-2 hover:bg-neutral-100 p-1.5 px-3 rounded-md">
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
                <span className="flex items-center justify-center font-bold text-white text-[18px]">
                  {user?.email ? (
                    `${user.email[0].toUpperCase()}`
                  ) : (
                    <User className="text-white h-5 w-5 " />
                  )}
                </span>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <p className="capitalize text-sm md:text-[16px]">
            {user?.nom?.toLowerCase()} {user?.prenom?.toLowerCase()}
          </p>
        </div>
        <DropdownMenuContent className="w-56 mr-2 ">
          <DropdownMenuItem
            className="text-[15px] flex items-center cursor-pointer"
            onClick={onClick}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};
