import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlanning, getPlanningRecord } from "@/lib/planning";
import { Planning } from "./planning";
import { NothingFound } from "@/components/nothing-found";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Calendar = async () => {
  const planning = await getPlanning();
  const recordNumber = await getPlanningRecord();

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
      <section className=" font.className">
        <ScrollArea className="m-4 mb-0 bg-white rounded-md p-4  h-[82vh]  ">
          <Planning resultat={planning} recordNumber={recordNumber} />
        </ScrollArea>
      </section>
    );
  }
};
