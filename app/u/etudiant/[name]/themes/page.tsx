import { Suspense } from "react";

import { EtudiantThemes } from "./theme";
import { Loader } from "@/app/u/_components/loader";

const EtudiantThemesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <EtudiantThemes />;
    </Suspense>
  );
};

export default EtudiantThemesPage;
