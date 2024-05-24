import { Suspense } from "react";

import { Loader } from "../../_components/loader";
import { Calendar } from "./calendar";

const ThemesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Calendar />;
    </Suspense>
  );
};

export default ThemesPage;
