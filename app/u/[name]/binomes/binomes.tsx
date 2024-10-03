import { Binomes } from "@/components/enseignant/binomes";
import { getaffectations } from "@/lib/affectation";
import { currentUser } from "@/lib/current-user";
import { getMesThemsChoisi } from "@/lib/themes";
import { redirect } from "next/navigation";

import { Theme, affectations } from "./page";
import { getSpecialites } from "@/lib/specialite";

export const Binome = async () => {
  const user = await currentUser();
  const specilaites = await getSpecialites();

  if (!user || !user?.prenom) {
    redirect(`/login`);
  }
  if (!user.role) {
    redirect(`/u/etudiant/${user?.prenom.toLowerCase()}/themes`);
  }
  const themes: Theme[] = await getMesThemsChoisi();
  const affectations: affectations[] = await getaffectations();
  const { attenteListe } = filterThemesByEtat(themes);

  return (
    <main className=" p-3 lg:p-6 bg-main w-full h-screen">
      <Binomes
        validatedList={affectations}
        attenteListe={attenteListe}
        specialites={specilaites}
      />
    </main>
  );
};

function filterThemesByEtat(themes: Theme[]): {
  validatedList: Theme[];
  attenteListe: Theme[];
} {
  const validatedSet = new Set<string>();
  const attenteSet = new Set<string>();

  themes.forEach((theme) => {
    theme.ChoisirTheme.forEach((choix) => {
      if (choix.etat === "VALIDE") {
        validatedSet.add(theme.id);
      } else if (choix.etat === "ATTENTE") {
        attenteSet.add(theme.id);
      }
    });
  });

  const validatedList = themes.filter((theme) => validatedSet.has(theme.id));
  const attenteListe = themes.filter((theme) => attenteSet.has(theme.id));

  return { validatedList, attenteListe };
}
