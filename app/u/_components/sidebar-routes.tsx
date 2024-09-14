"use client";

import {
  Palette,
  DoorOpen,
  HomeIcon,
  UserCog,
  CalendarCheck,
  Blend,
  History,
  MessageCircleCode,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Skeleton } from "@/components/ui/skeleton";

export const SidebarRoutes = () => {
  const user = useCurrentUser();
  const EnsRoutes = [
    {
      icon: HomeIcon,
      label: "Home",
      href: `/u/${user?.prenom.toLowerCase()}`,
    },

    {
      icon: UserCog,

      label: "Binomes",
      href: `/u/${user?.prenom.toLowerCase()}/binomes`,
    },
    {
      icon: Palette,

      label: "Thèmes",
      href: `/u/${user?.prenom.toLowerCase()}/themes`,
    },
    {
      icon: DoorOpen,

      label: "Planning personnel",
      href: `/u/${user?.prenom.toLowerCase()}/planning-personnel`,
    },
    {
      icon: CalendarCheck,

      label: "Calendrier",
      href: `/u/${user?.prenom.toLowerCase()}/calendar`,
    },
  ];
  const EtudRoutes = [
    {
      icon: Palette,

      label: "Thèmes",
      href: `/u/etudiant/${user?.prenom.toLowerCase()}/themes`,
    },

    {
      icon: Blend,

      label: "Mes Choix",
      href: `/u/etudiant/${user?.prenom.toLowerCase()}/meschoix`,
    },
    {
      icon: History,

      label: "Historique",
      href: `/u/etudiant/${user?.prenom.toLowerCase()}/historique`,
    },
    {
      icon: MessageCircleCode,

      label: "Messagerie",
      href: `/u/etudiant/${user?.prenom.toLowerCase()}/messagerie`,
    },

    {
      icon: CalendarCheck,

      label: "Calendrier",
      href: `/u/${user?.prenom.toLowerCase()}/calendar`,
    },
  ];

  if (!user)
    return (
      <div className="flex flex-col space-y-5 w-full pt-2 p-3  mt-4">
        <div className="space-y-4">
          <Skeleton className="h-14 w-full bg-slate-700" />
          <Skeleton className="h-14 w-full bg-slate-700" />
          <Skeleton className="h-14 w-full bg-slate-700" />
          <Skeleton className="h-14 w-full bg-slate-700" />
          <Skeleton className="h-14 w-full bg-slate-700" />
        </div>
      </div>
    );

  return (
    <nav className="flex flex-col w-full pt-5 ">
      {user?.role &&
        EnsRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      {!user?.role &&
        EtudRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
    </nav>
  );
};
