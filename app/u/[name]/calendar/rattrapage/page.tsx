import { Loader } from "@/app/u/_components/loader";
import { Suspense } from "react";
import { CalendarRattrapage } from "./calendar-rattrapage";

const CalendarRattrapagePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CalendarRattrapage />
    </Suspense>
  );
};

export default CalendarRattrapagePage;
