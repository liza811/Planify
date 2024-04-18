import { Suspense } from "react";
import { Loader } from "../../_components/loader";
import { Themes } from "./themes";

export interface AjouterModelProps {
  specialites: { nom: string }[] | null;
}
const ThemesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Themes />;
    </Suspense>
  );
};

export default ThemesPage;
