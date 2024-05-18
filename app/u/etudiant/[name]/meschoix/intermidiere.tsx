import { Main, Theme } from "@/components/etudiant";
import { InfoEncadrant } from "@/components/etudiant/encadrant";
import { NothingFound } from "@/components/nothing-found";
import { getChoixEnAttente, getEncadrant } from "@/lib/choix";
import { getConfiguration } from "@/lib/configuration";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialiteNonChoisi } from "@/lib/themes";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

const Intermidiere = async () => {
  const user = await currentUser();

  if (!user || !user.prenom) {
    return (
      <Suspense fallback={<ClipLoader size={30} className="text-slate-800" />}>
        <main className="w-full h-full flex items-center justify-center">
          <ClipLoader size={30} className="text-slate-800" />
        </main>
      </Suspense>
    );
  }

  if (user.role) {
    redirect(`/u/${user?.prenom}/themes`);
  }
  const encadrant = await getEncadrant();
  if (!!encadrant) {
    return (
      <Suspense fallback={<ClipLoader size={30} className="text-slate-800" />}>
        <main className="h-[89vh]  gap-y-5  p-6 bg-[#EFF3FF]">
          <InfoEncadrant encadrant={encadrant} />
        </main>
      </Suspense>
    );
  }
  const themes = await getThemesParSpecialiteNonChoisi();
  if (!themes?.length) {
    return (
      <NothingFound
        header="Aucun thème trouvé"
        paragraph=""
        src="/task-searching.png"
        size={150}
      />
    );
  }

  const mesChoix = await getChoixEnAttente();
  if (!!themes && !!mesChoix) {
    const themesWithChoix: ExtendedTheme[] = [];
    const themesWithoutChoix: Theme[] = [];

    for (const theme of themes) {
      const matchingChoix = mesChoix.find(
        (choix) => choix.theme.id === theme.id
      );

      if (matchingChoix) {
        const updatedTheme = { ...theme, etat: matchingChoix.etat };
        themesWithChoix.push(updatedTheme);
      } else {
        themesWithoutChoix.push(theme);
      }
    }
    const configuration = await getConfiguration();
    return (
      <Suspense fallback={<ClipLoader size={30} className="text-slate-800" />}>
        <main className=" w-full h-full   ">
          <Main
            themes={themesWithoutChoix}
            mesChoix={themesWithChoix}
            configuration={configuration}
          />
          ;
        </main>
      </Suspense>
    );
  }
  const configuration = await getConfiguration();
  return (
    <Suspense fallback={<ClipLoader size={30} className="text-slate-800" />}>
      <main className=" w-full h-full  ">
        {!!themes && <Main themes={themes} configuration={configuration} />}
      </main>
    </Suspense>
  );
};

export default Intermidiere;
