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

import { DialogTrigger, Dialog } from "../ui/dialog";

import { EditProfile } from "./edit-profile";
import { logout } from "@/actions/logout";

export const UserButton = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className=" outline-none">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-[#5454dd]">
              <User className="text-white h-6 w-6 " />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2 ">
          <DropdownMenuLabel className="flex items-center text-[16px]">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className="text-[15px] flex items-center cursor-pointer">
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="text-[15px] flex items-center cursor-pointer"
            onClick={onClick}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProfile />
    </Dialog>
  );
};
