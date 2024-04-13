import { ListThemes } from "@/components/etudiant/liste-themes";
import { NothingFound } from "@/components/nothing-found";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialite } from "@/lib/themes";
import { redirect } from "next/navigation";
import { ClipLoader } from "react-spinners";

const EtudiantThemesPage = async () => {
  const themes = await getThemesParSpecialite();
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

  return (
    <main className="flex flex-col gap-y-4 w-full h-full p-6 bg-[#F9FAFC]">
      {!!themes && (
        <section className="flex flex-col w-full  rounded-sm  h-full p-4 ">
          <ListThemes themes={themes} />
        </section>
      )}
    </main>
  );
};

export default EtudiantThemesPage;
