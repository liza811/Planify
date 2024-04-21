"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "700", "900"],
});

interface SidebarItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // const isActive =
  //   (href === "/" && pathname === "/") ||
  //   href === pathname ||
  //   pathname?.startsWith(`${href}/`);
  const isActive = href === pathname;
  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-slate-600 text-[15px] font-[500] pl-6 pb-1 transition-all hover:text-slate-700 hover:bg-slate-300/20",
        font.className,
        isActive &&
          "text-slate-800 bg-[#F3F4F8]/70 hover:bg-slate-300/20 hover:text-slate-800/80"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={25}
          className={cn("text-slate-500", isActive && "text-[#5454dd]/90 ")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-[2px] border-[#5454dd] rounded-s h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  );
};
