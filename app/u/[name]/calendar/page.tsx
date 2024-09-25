import { Suspense } from "react";

import { Loader } from "../../_components/loader";
import { Calendar } from "./calendar";

const CalendarPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Calendar />
    </Suspense>
  );
};

export default CalendarPage;
