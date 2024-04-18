import { Theme } from "@/components/etudiant";

import Intermidiere from "./intermidiere";
import { $Enums } from "@prisma/client";
import { Suspense } from "react";

import { Loader } from "@/app/u/_components/loader";

export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

const ChoixPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Intermidiere />;
    </Suspense>
  );
};

export default ChoixPage;
