import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlanningRattrapage } from "@/lib/planning";

import { NothingFound } from "@/components/nothing-found";
import { Planning } from "../planning";

export const CalendarRattrapage = async () => {
  const planning = await getPlanningRattrapage();
  if (!planning) {
    return (
      <NothingFound
        header="Aucun planning trouvé"
        paragraph="Vous recevrez une notification dès que le planning sera affiché."
        src="/task-searching.png"
      />
    );
  }
  if (planning.length > 0) {
    return (
      <section className="">
        <ScrollArea className="m-4 mb-0 bg-white rounded-md p-4  h-[82vh]  ">
          <Planning resultat={planning} rattrapage />
        </ScrollArea>
      </section>
    );
  }
};
