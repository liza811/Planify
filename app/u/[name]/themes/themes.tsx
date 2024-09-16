import { AjouterThemes } from "@/components/enseignant/ajouter-themes";
import { ListThemes } from "@/components/enseignant/list-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getConfiguration } from "@/lib/configuration";
import { currentUser } from "@/lib/current-user";

import { getDomaine, getSpecialites } from "@/lib/specialite";
import { getThemes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

interface AjouterModelProps {
  specialites: { nom: string }[] | null;
}
export const Themes = async () => {
  const user = await currentUser();
  if (!user || !user.prenom) redirect("/login");
  if (!user.role) {
    redirect(`/u/etudiant/${user?.prenom.toLowerCase()}/themes`);
  }
  const specilaites = await getSpecialites();
  const domaines = await getDomaine();
  const themes = await getThemes();
  const configuration = await getConfiguration();

  if (!themes?.length)
    return (
      <main className="flex flex-col items-center justify-center w-full h-full bg-[#F9FAFC]">
        <Image src={"/note.svg"} height={90} width={90} alt="nothing-found" />
        <h1 className="text-[16px] md:text-[18px] text-foreground font-bold p-2 pb-1 capitalize">
          {"Aucun thème trouvé"}
        </h1>
        <p className=" text-muted-foreground mb-3 text-sm ">
          {"Commencez à ajouté vos thèmes en cliquant ici"}
        </p>
        <AjouterThemes specialites={specilaites} domaines={domaines} />
      </main>
    );
  return (
    <main
      className={cn(
        "flex flex-col gap-y-4 w-full h-full p-6 bg-[#F9FAFC]",
        !configuration?.nbTheme && "justify-end"
      )}
    >
      <section className="flex w-full   justify-between">
        {!!configuration && !!configuration.nbTheme && (
          <div className="flex gap-x-2 items-center">
            <PopHelp nbTheme={configuration.nbTheme} />
            <p className="text-sm font-semibold">
              Vous avez proposé {themes.length}{" "}
              {themes.length == 1 ? `thème` : `thèmes`}{" "}
            </p>
          </div>
        )}

        {(!configuration ||
          !configuration.nbTheme ||
          themes.length < configuration.nbTheme) && (
          <AjouterThemes
            specialites={specilaites}
            domaines={domaines}
            nbTheme={configuration?.nbTheme}
            nbPropose={themes.length}
          />
        )}
      </section>
      {!!themes && (
        <section className="flex flex-col w-full  rounded-sm  h-full p-4  px-0">
          <ListThemes
            themes={themes}
            specialites={specilaites}
            domaine={domaines}
          />
        </section>
      )}
    </main>
  );
};

const PopHelp = ({ nbTheme }: { nbTheme?: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CircleHelp className="text-slate-600 w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Vous avez le droit de proposer jusqu&apos;à {nbTheme} thèmes.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
