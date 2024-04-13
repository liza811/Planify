import { Main, Theme } from "@/components/etudiant";
import { InfoEncadrant } from "@/components/etudiant/encadrant";
import { NothingFound } from "@/components/nothing-found";
import { getChoix, getEncadrant } from "@/lib/choix";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialite } from "@/lib/themes";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";
import { ClipLoader } from "react-spinners";

export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

const ChoixPage = async () => {
  const themes = await getThemesParSpecialite();
  const mesChoix = await getChoix();
  const encadrant = await getEncadrant();
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

  if (!themes?.length) {
    return (
      <NothingFound header="Aucun thème trouvé" paragraph="" src="/note.svg" />
    );
  }

  if (!!encadrant) {
    return (
      <main className="h-[89vh] overflow-y-auto gap-y-5  p-6 bg-[#fcfcfd]">
        <InfoEncadrant encadrant={encadrant} />
      </main>
    );
  }

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
      <main className=" w-full h-full   ">
        <Main themes={themesWithoutChoix} mesChoix={themesWithChoix} />;
      </main>
    );
  }

  return (
    <main className=" w-full h-full  ">
      {!!themes && <Main themes={themes} />}
    </main>
  );
};

export default ChoixPage;
