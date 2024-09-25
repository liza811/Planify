import { Planning } from "@/components/enseignant/planning-personnel";
import { NothingFound } from "@/components/nothing-found";
import { getConfiguration } from "@/lib/configuration";
import { getPlanningPersonnelRattrapage } from "@/lib/planning";
import { planning } from "@/types";
import { Configuration } from "@prisma/client";

export const PlanningPersonnelRattrapage = async () => {
  const planning: planning[] | null = await getPlanningPersonnelRattrapage();
  const config: Configuration | null = await getConfiguration();
  if (!planning) {
    return (
      <NothingFound
        header="Aucun planning trouvé"
        paragraph=""
        src="/task-searching.png"
      />
    );
  }
  if (!planning.length) {
    return (
      <NothingFound
        header="Vous ne figurez pas dans le planning actuellement."
        paragraph=""
        src="/task-searching.png"
      />
    );
  }
  return (
    <main className="p-3 md:p-4 w-full h-full overflow-y-auto bg-[#F5F4F9] ">
      <Planning planning={planning} config={config} rattrapage />
    </main>
  );
};
