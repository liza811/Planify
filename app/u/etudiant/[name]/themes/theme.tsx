import { ListThemes } from "@/components/etudiant/liste-themes";
import { NothingFound } from "@/components/nothing-found";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialite } from "@/lib/themes";
import { redirect } from "next/navigation";

export const EtudiantThemes = async () => {
  const themes = await getThemesParSpecialite();
  const user = await currentUser();

  if (!user || !user?.prenom) {
    redirect("/login");
  }
  if (user.role) {
    redirect(`/u/${user?.prenom.toLowerCase()}`);
  }
  if (!themes?.length) {
    return (
      <NothingFound
        header="Aucun thème trouvé"
        paragraph=""
        src="/note.svg"
        size={110}
      />
    );
  }

  return (
    <main className="flex flex-col gap-y-4 w-full h-full  bg-[#F9FAFC]">
      {!!themes && <ListThemes themes={themes} />}
    </main>
  );
};
