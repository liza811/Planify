import { Planning } from "@/components/enseignant/planning-personnel";
import { NothingFound } from "@/components/nothing-found";
import { Button } from "@/components/ui/button";
import { getConfiguration } from "@/lib/configuration";
import { currentUser } from "@/lib/current-user";
import { getPlanningPersonnel } from "@/lib/planning";
import { planning } from "@/types";
import { Configuration } from "@prisma/client";
import { ArrowRightFromLine } from "lucide-react";
import Link from "next/link";

export const PlanningPersonnel = async () => {
  const user = await currentUser();
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
  if (!planning.length) {
    return (
      <main className=" flex flex-col items-center justify-center w-full h-full gap-y-2">
        <div>
          <NothingFound
            header="Vous ne figurez pas dans le planning actuellement."
            paragraph=""
            src="/task-searching.png"
          />
        </div>
        <Link
          href={`/u/${user?.prenom.toLowerCase()}/planning-personnel/rattrapage`}
        >
          <Button
            className=" h-9  border-slate-400 bg-transparent flex gap-x-2"
            variant={"outline"}
          >
            Session rattrapage
            <ArrowRightFromLine size={18} className="text-accent-foreground" />
          </Button>
        </Link>
      </main>
    );
  }
  return (
    <main className="p-3 md:p-4 w-full h-full overflow-y-auto bg-[#F5F4F9] ">
      <Planning planning={planning} config={config} />
    </main>
  );
};
