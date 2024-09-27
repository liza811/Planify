"use client";
import { CircleHelp, FileUpIcon } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Configuration } from "@prisma/client";
import { planningWithDate } from "@/app/u/[name]/planning-personnel/page";
import { planning } from "@/types";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { addMinutes, format, isBefore, parse } from "date-fns";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

interface planningProps {
  planning: planning[];
  config: Configuration | null;
  rattrapage?: boolean;
}

export const Planning = ({ config, planning, rattrapage }: planningProps) => {
  const [mounted, setMounted] = useState(false);
  const user = useCurrentUser();
  const pdfRef = useRef<HTMLTableElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const planningWithDateAndTime: planningWithDate[] = [];
  const planningWithoutDateAndTime: planning[] = [];

  planning?.forEach((itemPlanning) => {
    if (itemPlanning.date && itemPlanning.heure) {
      planningWithDateAndTime.push(itemPlanning as planningWithDate);
    } else {
      planningWithoutDateAndTime.push(itemPlanning);
    }
  });
  //////////////////////////////////////////////////////////////////////////////////
  const groupedByDate: { [date: string]: planningWithDate[] } = {};

  planningWithDateAndTime.forEach((item) => {
    if (item.date) {
      if (!groupedByDate[item.date]) {
        groupedByDate[item.date] = [];
      }
      groupedByDate[item.date].push(item);
    }
  });

  // Get unique dates and unique time slots
  const dates = Object.keys(groupedByDate).sort();
  // const timeSlots = Array.from(
  //   new Set(planningWithDateAndTime.map((item) => item.heure))
  // ).sort();
  const timeSlots = generateTimeSlots(
    config?.heureDebut,
    config?.heureFin,
    config?.duree
  );
  const handleExportClick = async () => {
    if (isExporting) return;

    setIsExporting(true);

    const input = pdfRef.current;
    if (!input) {
      console.error("Content element not found");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;

      // Calculate optimal image scaling to fit the page
      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const scale = Math.min(widthRatio, heightRatio);

      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;
      const leftMargin = (pdfWidth - finalWidth) / 2;
      const topMargin = 10;
      const bottomMargin = 10;

      pdf.addImage(
        imgData,
        "PNG",
        leftMargin,
        topMargin,
        finalWidth,
        finalHeight
      );

      setIsExporting(false);
      pdf.save("planning.pdf");
    });
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <section className="flex flex-col w-full h-full ">
      <div className={cn("w-full p-2 pt-0 flex justify-between")}>
        <Button
          type="button"
          onClick={handleExportClick}
          disabled={isExporting}
          className={cn(
            "bg-black text-white min-w-[100px]",
            rattrapage ? "ml-auto " : ""
          )}
        >
          <FileUpIcon className="h-5 w-5 mr-2 " />
          {isExporting ? "Exportation..." : "Exporter  "}
        </Button>
        {!rattrapage && (
          <Link
            href={`/u/${user?.prenom.toLowerCase()}/planning-personnel/rattrapage`}
          >
            <Button
              className=" h-9  border-slate-400 bg-transparent"
              variant={"outline"}
            >
              Session rattrapage
            </Button>
          </Link>
        )}
      </div>

      <div className="  w-full bg-white rounded-md p-4 h-full overflow-x-auto sm:overflow-x-visible ">
        <table
          className="min-w-fit table-fixed border-collapse border border-gray-100 overflow-x-auto w-full"
          ref={pdfRef}
        >
          <thead>
            <tr>
              <th className="border border-gray-100 p-2 text-center w-28 text-sm bg-[#cfb5ff]/30 "></th>
              {timeSlots.map((time) => (
                <th
                  key={time}
                  className="border border-gray-100 p-2 text-center text-slate-500 text-sm font-medium  w-[230px] bg-[#cfb5ff]/30"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date) => (
              <tr key={date} className="text-slate-700 text-sm font-medium">
                <td className="border border-gray-100 p-2  bg-[#cfb5ff]/10">
                  {date}
                </td>
                {timeSlots.map((time) => {
                  const matchingItems = groupedByDate[date]?.filter(
                    (item) => item.heure === time
                  );
                  const hexColors = [
                    "#8089A8",
                    "#5AE31B",

                    "#c99789",
                    "#9F53FF",

                    "#67203C ",
                    "#6A006A ",
                    "#FF8A00 ",
                    "#F06292 ",
                    "#000080 ",
                    "#004B3A ",
                    "#793420 ",
                  ];
                  const randomColor = getRandomColor(hexColors);
                  return (
                    <td
                      key={time}
                      className="border border-gray-100 p-2 h-full w-[230px]"
                    >
                      {matchingItems && matchingItems.length > 0 ? (
                        <ul className="min-h-full">
                          {matchingItems.map((item) => (
                            <li
                              key={item.id}
                              className="flex flex-col gap-y-3 rounded-md p-2 relative group w-[230px] min-h-full rounded-r-xl"
                              style={{
                                backgroundColor: hexToRgba(randomColor, 0.2),
                              }}
                            >
                              <div
                                className="left-0 top-0 rounded-s-3xl absolute w-1 h-full "
                                style={{
                                  backgroundColor: randomColor || "#9F53FF",
                                }}
                              />
                              <div className="flex flex-col gap-y-2 ml-2 capitalize">
                                <div className="flex justify-between">
                                  <span className="text-slate-600 text-sm">
                                    Binome:
                                  </span>
                                  <div className=" text-slate-700  flex opacity-0 group-hover:opacity-100 transition-all gap-x-2">
                                    <Pop
                                      theme={
                                        item.Binome?.Affectation?.Theme?.nom
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  {item.Binome?.etudiants.map((s) => (
                                    <div
                                      className="flex  w-full justify-between   "
                                      key={s.nom.concat(s.prenom || "")}
                                    >
                                      <p className="  text-sm  text-black w-fit ">
                                        {s.nom.toLowerCase()}{" "}
                                        {s.prenom.toLowerCase()}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <div className="flex gap-x-2 capitalize">
                                  <span className="text-slate-700 text-[14px]  ">
                                    Encadrant:
                                  </span>
                                  <p className="flex gap-x-2  text-sm  text-black w-fit  ">
                                    {item.Binome?.Affectation?.encadrent?.nom.toLowerCase()}{" "}
                                    {item.Binome?.Affectation?.encadrent?.prenom.toLowerCase()}
                                  </p>
                                </div>

                                <div className="flex gap-x-2 capitalize">
                                  <span className="text-slate-700 text-[14px]">
                                    Président:
                                  </span>
                                  <p className="flex gap-x-2  text-sm  text-black w-fit ">
                                    {item.president ? (
                                      <>
                                        {item.president?.nom.toLowerCase()}{" "}
                                        {item.president?.prenom.toLowerCase()}
                                      </>
                                    ) : (
                                      <span className="size-fit px-2 py-1 bg-[#FF00001A] text-[#FF0000]  2xl:text-sm text-[13px]">
                                        Aucune Président associé
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="flex gap-x-2 capitalize">
                                  <span className="text-slate-600 text-sm">
                                    Examinateurs:
                                  </span>
                                  <p>
                                    {!!item.examinateurs.length ? (
                                      item.examinateurs?.map((s) => (
                                        <div
                                          className="flex  w-full justify-between  "
                                          key={s.enseignant?.nom}
                                        >
                                          <p className="   text-sm  text-black w-fit ">
                                            {s.enseignant?.nom.toLowerCase()}{" "}
                                            {s.enseignant?.prenom.toLowerCase()}
                                          </p>
                                        </div>
                                      ))
                                    ) : (
                                      <span className="size-fit px-2 py-1 bg-[#FF00001A] text-[#FF0000]  2xl:text-sm text-[13px]">
                                        Aucune examinateur associé
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="flex gap-x-4 items-center text-wrap">
                                  <span className="text-slate-600 text-[14px]">
                                    Salle:
                                  </span>
                                  <p className="flex gap-x-2   2xl:text-sm text-[13px] my-0 py-0 text-black w-fit ">
                                    {item.salle ? (
                                      `Bloc: ${item.salle.bloc} N°: ${item.salle.numero} `
                                    ) : (
                                      <span className="size-fit px-2 py-1 bg-[#FF00001A] text-[#FF0000] ">
                                        Aucune salle associé
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
const Pop = ({ theme }: { theme: string | undefined }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CircleHelp className="text-slate-600 h-5 w-5 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="w-56 z-40 bg-white text-sm" side="bottom">
          <p>{theme}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function getRandomColor(colors: string[]) {
  if (!Array.isArray(colors) || colors.length === 0) {
    throw new Error("Colors array is empty or not an array");
  }

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}

function generateTimeSlots(
  startTime: string | undefined,
  endTime: string | undefined,
  duration: string | undefined
): string[] {
  if (!startTime || !endTime || !duration) return [];

  const start = parse(startTime, "HH:mm", new Date());
  const end = parse(endTime, "HH:mm", new Date());
  const durationMinutes =
    parse(duration, "HH:mm", new Date()).getHours() * 60 +
    parse(duration, "HH:mm", new Date()).getMinutes();

  const slots: string[] = [];
  let current = start;

  while (isBefore(current, end)) {
    slots.push(format(current, "HH:mm"));
    current = addMinutes(current, durationMinutes);
  }

  return slots;
}
