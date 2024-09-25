"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = href === pathname || pathname?.startsWith(`${href}/`);
  //const isActive = href === pathname;
  // const onClick = () => {
  //   router.push(href);
  // };

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-slate-300 text-[15px] font-[500] pl-6 pb-1 transition-all hover:text-white hover:bg-slate-300/20 hover:mx-2 hover:rounded-md hover:flex hover:justify-center",

        isActive &&
          "text-white bg-slate-300/20 mx-2 rounded-md flex justify-center items-center "
      )}
    >
      <div className="flex items-center gap-x-2 py-4 w-full">
        <Icon size={20} className={cn(isActive && "text-white ")} />
        {label}
      </div>
      {/* <div
      className={cn(
        "ml-auto opacity-0 border-[3px] border-primary_purpule rounded-s h-full transition-all",
        isActive && "opacity-100"
      )}
    /> */}
    </Link>
  );
};
