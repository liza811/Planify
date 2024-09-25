import { Binomee, Examinateur, President, Sallee } from "@/types";

import { Suspense } from "react";

import { PlanningPersonnelRattrapage } from "@/components/enseignant/planning-personnel-rattrapage";
import { Loader } from "@/app/u/_components/loader";

const PlanningPersonnelRattrapagePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PlanningPersonnelRattrapage />
    </Suspense>
  );
};

export default PlanningPersonnelRattrapagePage;
