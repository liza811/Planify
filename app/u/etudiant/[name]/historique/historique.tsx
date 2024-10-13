import { Theme } from "@/components/etudiant";
import { HistoriqueItem } from "@/components/etudiant/historique-item";

import { NothingFound } from "@/components/nothing-found";
import { getChoix } from "@/lib/choix";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialite } from "@/lib/themes";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

export const Historique = async () => {
  const themes = await getThemesParSpecialite();
  const mesChoix = await getChoix();

  const user = await currentUser();

  if (!user || !user?.prenom) {
    redirect(`/login`);
  }
  if (user.role) {
    redirect(`/u/${user?.prenom.toLowerCase()}`);
  }

  if (!mesChoix?.length || !themes?.length) {
    return (
      <NothingFound
        header="Aucun choix trouvé"
        paragraph="Commencez à choisir des thèmes et visualisez leurs état ici."
        src="/note.svg"
        size={100}
      />
    );
  }
  const themesWithChoix: ExtendedTheme[] = [];

  for (const theme of themes) {
    const matchingChoix = mesChoix.find((choix) => choix.theme.id === theme.id);

    if (matchingChoix) {
      const updatedTheme = { ...theme, etat: matchingChoix.etat };
      themesWithChoix.push(updatedTheme);
    }
  }

  return (
    <main className=" w-full   h-full p-3  md:p-6 bg-main overflow-x-auto">
      <section className="w-full h-full bg-white rounded-md p-2 md:p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-washed-blue-100/60">
              <tr className="capitalize ">
                <th className="text-slate-500 text-center py-4 px-6 w-3/4 font-normal">
                  Thème
                </th>
                <th className="text-slate-500 text-center py-4 px-6 w-[10%] font-normal">
                  Proposé par
                </th>
                <th className="text-slate-500 text-center py-4 px-6 w-[6%] font-normal">
                  état
                </th>
              </tr>
            </thead>
            <tbody>
              {themesWithChoix?.map((choix) => {
                return (
                  <>
                    <HistoriqueItem
                      proposePar={`${choix.proposePar?.nom} ${choix.proposePar?.prenom}`}
                      nom={choix.nom}
                      etat={choix.etat!}
                    />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};
