import { stringToColor } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Calendar, Edit } from "lucide-react";
import { DeleteTheme } from "./delete-theme";

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
  specialite: ThemeSpecialites;
}
export const ThemeItem = ({
  nom,
  createdAt,
  specialite,
  id,
}: ThemeItemProps) => {
  const bg = stringToColor(nom);
  // const bgSpecialite = stringToColor(specialite || "");
  return (
    <div className=" flex flex-col bg-white shadow-sm justify-between group hover:opacity-75 scale-103">
      <div>
        <div className="w-full h-1 rounded-t-sm" style={{ background: bg }} />
        <div className="flex justify-between w-full p-2 gap-x-2 py-2">
          <div className="w-full flex gap-x-2 flex-wrap gap-y-1">
            {specialite.map((s) => (
              <p
                className=" font-semibold rounded-lg text-[12px] px-4 py-1 text-black bg-slate-200"
                key={s.specialite.nom}
              >
                {s.specialite.nom}
              </p>
            ))}
          </div>
          <div className=" text-slate-700 flex opacity-0 group-hover:opacity-100 transition-all gap-x-2">
            <Edit className=" w-5 h-5 cursor-pointer" />
            <DeleteTheme themeId={id} />
          </div>
        </div>
        <div className="w-full p-3 rounded-sm text-xs font-medium text-wrap capitalize">
          {nom}
        </div>
      </div>
      <div className="p-2 ">
        <div className="w-full h-[1px]  bg-slate-300 rounded-lg" />
        <p className="flex gap-x-2 text-slate-700 text-xs capitalize mt-2">
          <Calendar className="h-4 w-4" />

          {`ajouté le ${formatDate(createdAt, "yyyy-MM-dd")}`}
        </p>
      </div>
    </div>
  );
};
