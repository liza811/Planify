import { Theme } from "@/components/etudiant";
import { HistoriqueItem } from "@/components/etudiant/historique-item";

import { NothingFound } from "@/components/nothing-found";
import { getChoix } from "@/lib/choix";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialite } from "@/lib/themes";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";
import { ClipLoader } from "react-spinners";

export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

const HitoriquePage = async () => {
  const themes = await getThemesParSpecialite();
  const mesChoix = await getChoix();

  const user = await currentUser();

  if (!user || !user.prenom) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <ClipLoader size={30} className="text-slate-800" />
      </main>
    );
  }

  if (user.role) {
    redirect(`/u/${user?.prenom}/themes`);
  }

  if (!mesChoix?.length || !themes?.length) {
    return (
      <NothingFound
        header="Aucun choix trouvé"
        paragraph="Commencez à choisir des thèmes et visualisez leurs état ici."
        src="/note.svg"
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
    <main className=" w-full   h-full  p-6 bg-main">
      <section className=" w-full h-full bg-white rounded-md p-4">
        <div className="flex items-center justify-between border-b bg-[#f0f3ff] py-4 px-6 w-full capitalize">
          <div className="w-3/4 text-slate-500 text-center">Thème</div>
          <div className="w-w-[10%] text-slate-500 text-center">
            Proposé par
          </div>
          <div className="w-[6%] text-slate-500 text-center">état</div>
        </div>

        <div className="flex flex-col  items-center justify-between border  py-2 px-6 w-full bg-white">
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
        </div>
      </section>
    </main>
  );
};

export default HitoriquePage;
