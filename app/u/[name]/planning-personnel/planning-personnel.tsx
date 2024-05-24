import { Planning } from "@/components/enseignant/planning-personnel";
import { NothingFound } from "@/components/nothing-found";
import { getConfiguration } from "@/lib/configuration";
import { getPlanningPersonnel } from "@/lib/planning";
import { planning } from "@/types";
import { Configuration } from "@prisma/client";

export const PlanningPersonnel = async () => {
  const planning: planning[] | null = await getPlanningPersonnel();
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
  return (
    <main className="p-4 w-full h-[88vh] bg-[#F5F4F9] overflow-x-scroll">
      <Planning planning={planning} config={config} />
    </main>
  );
};
