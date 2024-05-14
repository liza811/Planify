import { Planning } from "@/components/enseignant/planning-personnel";
import { getConfiguration } from "@/lib/configuration";
import { getPlanning } from "@/lib/planning";
import { Binomee, Examinateur, President, Sallee, planning } from "@/types";
import { Configuration } from "@prisma/client";

export type planningWithDate = {
  salle: Sallee | null;
  date: string;
  heure: string;
  examinateurs: Examinateur[];
  Binome: Binomee | null;
  id: number;
  president: President | null;
};
const PlanningPersonnelPage = async () => {
  const planning: planning[] | null = await getPlanning();
  const config: Configuration | null = await getConfiguration();

  return (
    <main className="p-4 w-full h-[88vh] bg-[#F5F4F9] overflow-x-scroll">
      <Planning planning={planning} config={config} />
    </main>
  );
};

export default PlanningPersonnelPage;
