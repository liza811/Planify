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
    <tr key={nom} className="border-b last:border-b-0 capitalize">
      <td className="text-[15px] py-4 px-6 min-w-80">{nom}</td>
      <td className="text-sm font-normal text-center py-4 px-6 min-w-40">
        {proposePar.toLowerCase()}
      </td>
      <td>
        <span
          className={cn(
            "text-slate-700 text-xs font-semibold capitalize  px-3 py-1.5 text-center rounded-md",
            etatColor[etat]
          )}
        >
          {etatText[etat]}
        </span>
      </td>
    </tr>
  );
};
