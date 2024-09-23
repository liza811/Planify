import { cn } from "@/lib/utils";
import { $Enums, Etat } from "@prisma/client";

interface HistoriqueItemProps {
  nom: string;
  etat: $Enums.Etat;
  proposePar: string;
}

export const HistoriqueItem = ({
  etat,
  nom,
  proposePar,
}: HistoriqueItemProps) => {
  const etatColor = {
    [Etat.ATTENTE]: "bg-[#ff8F001A] text-[#ff8F00]",
    [Etat.REFUSE]: "bg-[#FF00001A] text-[#FF0000]",
    [Etat.VALIDE]: "bg-[#33D69F1A] text-[#33D69F]",
  };
  const etatText = {
    [Etat.ATTENTE]: "attente",
    [Etat.REFUSE]: "refusé",
    [Etat.VALIDE]: "validé",
  };
  return (
    <div className="flex items-center  justify-between border-b last:border-b-0 py-4  w-full font-medium capitalize">
      <div className="w-3/4 text-[15px]"> {nom}</div>
      <div className="w-[10%] font-normal  text-sm text-center">
        {proposePar.toLowerCase()}
      </div>
      <div
        className={cn(
          "w-[6%] flex items-center justify-center text-slate-700 text-xs capitalize mt-3  py-1.5 rounded-md font-semibold  ",
          etatColor[etat]
        )}
      >
        {etatText[etat]}
      </div>
    </div>
  );
};
