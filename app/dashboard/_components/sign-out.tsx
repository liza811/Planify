"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export const SignOut = () => {
  const onClick = () => {
    logout();
  };
  return (
    <Button
      asChild
      type="button"
      onClick={onClick}
      variant={"ghost"}
      className="flex items-center justify-start text-slate-500 text-[1rem] font-[500] pl-6   transition-all hover:text-slate-600 hover:bg-slate-300/20 mb-auto cursor-pointer"
    >
      <div className="flex items-center gap-x-2 ">
        <LogOutIcon size={25} className="text-slate-500" />
        {"signOut"}
      </div>
    </Button>
  );
};
