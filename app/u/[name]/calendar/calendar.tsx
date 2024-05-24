import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlanning } from "@/lib/planning";
import { Planning } from "./planning";
import { NothingFound } from "@/components/nothing-found";

export const Calendar = async () => {
  const planning = await getPlanning();
  if (!planning) {
    return (
      <NothingFound
        header="Aucun planning trouvé"
        paragraph=""
        src="/task-searching.png"
      />
    );
  }
  if (planning.length > 0) {
    return (
      <section className="">
        <ScrollArea className="m-4 mb-0 bg-white rounded-md p-4  h-[82vh]  ">
          <Planning resultat={planning} />
        </ScrollArea>
      </section>
    );
  }
};
