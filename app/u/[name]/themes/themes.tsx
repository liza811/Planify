import { AjouterThemes } from "@/components/enseignant/ajouter-themes";
import { ListThemes } from "@/components/enseignant/list-themes";
import { currentUser } from "@/lib/current-user";
import { getSpecialites } from "@/lib/specialite";
import { getThemes } from "@/lib/themes";
import Image from "next/image";
import { redirect } from "next/navigation";

interface AjouterModelProps {
  specialites: { nom: string }[] | null;
}
export const Themes = async () => {
  const specilaites = await getSpecialites();
  const themes = await getThemes();
  const user = await currentUser();
  if (!user) return null;
  if (!user.role) {
    redirect(`/u/etudiant/${user?.prenom}/themes`);
  }
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
        <AjouterThemes specialites={specilaites} />
      </main>
    );
  return (
    <main className="flex flex-col gap-y-4 w-full h-full p-6 bg-[#F9FAFC]">
      <section className="flex w-full   justify-end">
        <AjouterThemes specialites={specilaites} />
      </section>
      {!!themes && (
        <section className="flex flex-col w-full  rounded-sm  h-full p-4 ">
          <ListThemes themes={themes} />
        </section>
      )}
    </main>
  );
};
