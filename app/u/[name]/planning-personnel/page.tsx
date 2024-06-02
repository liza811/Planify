import { Binomee, Examinateur, President, Sallee } from "@/types";

import { Suspense } from "react";
import { Loader } from "../../_components/loader";
import { PlanningPersonnel } from "./planning-personnel";

export type planningWithDate = {
  salle: Sallee | null;
  date: string;
  heure: string;
  examinateurs: Examinateur[];
  Binome: Binomee | null;
  id: number;
  president: President | null;
};
const PlanningPersonnelPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PlanningPersonnel />
    </Suspense>
  );
};

export default PlanningPersonnelPage;
