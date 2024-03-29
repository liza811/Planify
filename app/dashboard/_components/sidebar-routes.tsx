"use client";

import {
  BarChart,
  Palette,
  DoorOpen,
  List,
  HomeIcon,
  User,
  UserCog,
  CalendarCheck,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
  {
    icon: HomeIcon,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: User,
    label: "Enseignant",
    href: "/dashboard/enseignants",
  },
  {
    icon: UserCog,

    label: "Etudiant",
    href: "/dashboard/etudiants",
  },
  {
    icon: Palette,

    label: "Themes",
    href: "/dashboard/themes",
  },
  {
    icon: DoorOpen,

    label: "Salles",
    href: "/dashboard/salles",
  },
  {
    icon: CalendarCheck,

    label: "Calendrier",
    href: "/dashboard/Calendrier",
  },
];

export const SidebarRoutes = () => {
  const routes = adminRoutes;

  return (
    <nav className="flex flex-col w-full pt-2">
      {routes.map((route) => (
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
