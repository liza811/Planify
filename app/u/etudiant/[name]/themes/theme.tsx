import { ListThemes } from "@/components/etudiant/liste-themes";
import { NothingFound } from "@/components/nothing-found";
import { currentUser } from "@/lib/current-user";

import { getThemesParSpecialite } from "@/lib/themes";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export const EtudiantThemes = async () => {
  const themes = await getThemesParSpecialite();
  const user = await currentUser();

  if (!user?.prenom) {
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
    <Suspense fallback={<ClipLoader size={30} className="text-slate-800" />}>
      <main className="flex flex-col gap-y-4 w-full h-full p-6 bg-[#F9FAFC]">
        {!!themes && (
          <section className="flex flex-col w-full  rounded-sm  h-full p-4 px-0 mb-3">
            <ListThemes themes={themes} />
          </section>
        )}
      </main>
    </Suspense>
  );
};
