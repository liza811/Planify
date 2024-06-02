import { Suspense } from "react";
import { Loader } from "../../_components/loader";
import { Themes } from "./themes";

export interface AjouterModelProps {
  specialites: { nom: string }[] | null;
  nbTheme?: number | null | undefined;
  nbPropose?: number;
}
const ThemesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Themes />
    </Suspense>
  );
};

export default ThemesPage;
