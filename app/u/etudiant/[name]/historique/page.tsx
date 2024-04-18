import { Theme } from "@/components/etudiant";

import { $Enums } from "@prisma/client";
import { Suspense } from "react";

import { Historique } from "./historique";
import { Loader } from "@/app/u/_components/loader";

export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

const HitoriquePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Historique />;
    </Suspense>
  );
};

export default HitoriquePage;
