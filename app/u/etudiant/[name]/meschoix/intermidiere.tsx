import { Main, Theme } from "@/components/etudiant";
import { InfoEncadrant } from "@/components/etudiant/encadrant";
import { NothingFound } from "@/components/nothing-found";
import { getChoixEnAttente, getEncadrant } from "@/lib/choix";
import { getConfiguration } from "@/lib/configuration";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialiteNonChoisi } from "@/lib/themes";
import { $Enums } from "@prisma/client";
import { isBefore, parseISO } from "date-fns";
import { CircleHelp } from "lucide-react";
import { redirect } from "next/navigation";

import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
export interface ExtendedTheme {
  etat?: $Enums.Etat;

  id: string;
  nom: string;
  proposerId: string;
  createdAt: Date;
}

const Intermidiere = async () => {
  let hasDatePassed = false;
  const user = await currentUser();
  const configuration = await getConfiguration();

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

  if (configuration && configuration.dateFinChoix) {
    const currentDate = new Date();

    hasDatePassed = isBefore(
      parseISO(configuration?.dateFinChoix?.toISOString()),
      currentDate
    );
  }

  if (hasDatePassed) {
    return (
      <NothingFound
        header="Date limite des choix est terminée."
        paragraph="Vous serez affecté automatiquement à un enseignant."
        src="/alarm-clock.png"
        size={150}
      />
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

    return (
      <main className=" w-full h-full  bg-neutral-100/90  p-6 pt-3 ">
        {!!configuration && !!configuration.nbChoix && (
          <div className="flex gap-x-2 items-center w-full justify-end  underline pb-3 pr-[15%]">
            <CircleHelp className="text-slate-600 w-4 h-4" />
            <p className="text-sm font-medium">
              Vous pouvez choisir jusqu&apos;à {configuration.nbChoix} Thèmes.
            </p>
          </div>
        )}
        <Main
          themes={themesWithoutChoix}
          mesChoix={themesWithChoix}
          configuration={configuration}
        />
        ;
      </main>
    );
  }

  return (
    <Suspense fallback={<ClipLoader size={30} className="text-slate-800" />}>
      <main className=" w-full h-full  ">
        {!!themes && <Main themes={themes} configuration={configuration} />}
      </main>
    </Suspense>
  );
};

export default Intermidiere;
