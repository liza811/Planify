import { Binomes } from "@/components/enseignant/binomes";
import { getaffectations } from "@/lib/affectation";
import { currentUser } from "@/lib/current-user";
import { getMesThemsChoisi } from "@/lib/themes";
import { redirect } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { Theme, affectations } from "./page";

export const Binome = async () => {
  const user = await currentUser();

  if (!user?.prenom) {
    return (
      <main className="flex justify-center items-center">
        <ClipLoader className="text-slate-900" size={30} />
      </main>
    );
  }
  if (!user.role) {
    redirect(`/u/etudiant/${user?.prenom}/themes`);
  }
  const themes: Theme[] = await getMesThemsChoisi();
  const affectations: affectations[] = await getaffectations();
  const { attenteListe } = filterThemesByEtat(themes);

  return (
    <main className="p-6 bg-main w-full h-full">
      <Binomes validatedList={affectations} attenteListe={attenteListe} />
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
