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
      href: `/u/${user?.prenom}`,
    },

    {
      icon: UserCog,

      label: "Binomes",
      href: `/u/${user?.prenom}/binomes`,
    },
    {
      icon: Palette,

      label: "Themes",
      href: `/u/${user?.prenom}/themes`,
    },
    {
      icon: DoorOpen,

      label: "Planning personnelle",
      href: "/dashboard/salles",
    },
    {
      icon: CalendarCheck,

      label: "Calendrier",
      href: `/u/${user?.prenom}/calendar`,
    },
  ];
  const EtudRoutes = [
    {
      icon: Palette,

      label: "Themes",
      href: `/u/etudiant/${user?.prenom}/themes`,
    },

    {
      icon: Blend,

      label: "Mes Choix",
      href: `/u/etudiant/${user?.prenom}/meschoix`,
    },
    {
      icon: History,

      label: "Historique",
      href: `/u/etudiant/${user?.prenom}/historique`,
    },
    {
      icon: MessageCircleCode,

      label: "Messagerie",
      href: `/u/etudiant/${user?.prenom}/messagerie`,
    },

    {
      icon: CalendarCheck,

      label: "Calendrier",
      href: "/dashboard/Calendrier",
    },
  ];

  if (!user)
    return (
      <div className="flex flex-col space-y-5 w-full pt-2 p-3  mt-4">
        <div className="space-y-4">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    );

  return (
    <nav className="flex flex-col w-full pt-2 ">
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
