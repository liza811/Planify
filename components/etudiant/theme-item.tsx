"use client";

import { stringToColor } from "@/lib/utils";
import { format, formatDate } from "date-fns";
import { Calendar } from "lucide-react";

interface Speciality {
  specialite: {
    nom: string;
  };
}

type ThemeSpecialites = Speciality[];
interface ThemeItemProps {
  nom: string;
  id: string;
  createdAt: Date;
  specialite?: ThemeSpecialites;
  proposePar: string;
}
export const ThemeItem = ({
  nom,
  specialite,
  proposePar,
  createdAt,
}: ThemeItemProps) => {
  const bg = stringToColor(nom);
  // const bgSpecialite = stringToColor(specialite || "");
  return (
    <div className=" flex flex-col bg-white shadow-md rounded-sm justify-between group hover:opacity-90 scale-103 transition duration-200 ease-in-out">
      <div>
        <div className="w-full h-1 rounded-t-sm" style={{ background: bg }} />
        <div className="flex justify-between w-full p-2 gap-x-2 gap-y-3">
          <div className="w-full flex gap-x-2 flex-wrap gap-y-1 flex-1">
            {specialite?.map((s) => (
              <p
                className="text-sm font-semibold rounded-lg px-4 py-1 text-black bg-slate-200"
                key={s.specialite.nom}
              >
                {s.specialite.nom}
              </p>
            ))}
          </div>
          <p className=" text-slate-800 text-sm  flex justify-end">
            {proposePar}
          </p>
        </div>
        <div className="w-full p-4 pt-2 rounded-sm text-[14px] font-medium text-wrap capitalize">
          {nom}
        </div>
      </div>
      <div className="p-2 py-3">
        <div className="w-full h-[1px]  bg-slate-300 rounded-lg" />
        <p className="flex gap-x-2 text-slate-700 text-xs capitalize mt-3">
          <Calendar className="h-4 w-4" />

          {`ajouté le ${formatDate(createdAt, "yyyy-MM-dd")}`}
        </p>
      </div>
    </div>
  );
};
