"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn, stringToColor } from "@/lib/utils";

import { useEffect, useRef, useState } from "react";

import { hexToRgba } from "@/components/etudiant/choix-item";
import { CircleHelp, FileUpIcon } from "lucide-react";
import { Binomee, Examinateur, President, Sallee } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type planning = {
  salle: Sallee | null;
  date: string | null;
  heure: string | null;
  examinateurs: Examinateur[];
  Binome: Binomee | null;
  id: number;

  president: President | null;
};

export type planningWithDate = {
  salle: Sallee | null;
  date: string;
  heure: string;
  examinateurs: Examinateur[];
  Binome: Binomee | null;
  id: number;

  president: President | null;
};
export const Planning = ({ resultat }: { resultat: planning[] }) => {
  const user = useCurrentUser();
  const isEtudiant = user?.role === false;
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const planningWithDateAndTime: planningWithDate[] = [];
  const planningWithoutDateAndTime: planning[] = [];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  resultat?.forEach((itemPlanning) => {
    if (itemPlanning.date && itemPlanning.heure) {
      planningWithDateAndTime.push(itemPlanning as planningWithDate);
    } else {
      planningWithoutDateAndTime.push(itemPlanning);
    }
  });

  const sortedPlanning = planningWithDateAndTime.sort((a, b) => {
    const aDateTime = `${a.date} ${a.heure}`;
    const bDateTime = `${b.date} ${b.heure}`;
    const aDateObj = new Date(aDateTime);
    const bDateObj = new Date(bDateTime);
    if (aDateObj < bDateObj) {
      return -1;
    } else if (aDateObj > bDateObj) {
      return 1;
    } else {
      return 0;
    }
  });
  const planningByDate = sortedPlanning.reduce(
    (groupedPlanning: Record<string, planning[]>, item) => {
      const date = item.date;
      if (!groupedPlanning[date]) {
        groupedPlanning[date] = [];
      }
      groupedPlanning[date].push(item);
      return groupedPlanning;
    },
    {}
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
      const topMargin = 5;
      const bottomMargin = 10;

      pdf.addImage(
        imgData,
        "PNG",
        leftMargin,
        topMargin,
        finalWidth,
        finalHeight - 10
      );

      setIsExporting(false);
      pdf.save("planning.pdf");
    });
  };
  if (!mounted) {
    return null;
  }
  return (
    <section className="flex flex-col w-full h-full ">
      <div className="w-full p-2 pt-0 flex justify-end">
        <Button
          type="button"
          onClick={handleExportClick}
          disabled={isExporting}
          className="bg-black text-white min-w-[100px]"
        >
          <FileUpIcon className="h-5 w-5 mr-2 " />
          {isExporting ? "Exportation..." : "Exporter  "}
        </Button>
      </div>
      <div className={cn("flex flex-col w-full h-full gap-y-4 ")} ref={pdfRef}>
        {Object.keys(planningByDate).map((date) => (
          <div key={date} className="">
            <h1
              className={cn(
                "text-base font-semibold rounded-md  px-4 py-1.5 text-black size-fit text-center mb-4 "
              )}
              style={{
                color: `${stringToColor(date)}`,
                backgroundColor: hexToRgba(stringToColor(date), 0.2),
              }}
            >
              {date}
            </h1>
            <div className="grid grid-cols-1  gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {/* afficher planning items for this date */}
              {planningByDate[date].map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col gap-y-3 rounded-md p-2 relative group"
                  )}
                  style={{
                    backgroundColor: hexToRgba(
                      stringToColor(item.Binome?.Affectation?.Theme.nom || ""),
                      0.05
                    ),
                  }}
                >
                  <div
                    className="left-0 top-0 rounded-s-3xl absolute w-1 h-full "
                    style={{
                      backgroundColor: hexToRgba(
                        stringToColor(
                          item.Binome?.Affectation?.Theme.nom || ""
                        ),
                        0.5
                      ),
                    }}
                  />
                  <div className="flex flex-col gap-y-2 ml-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 text-sm">Binome:</span>
                      <div className=" text-slate-700 flex opacity-0 group-hover:opacity-100 transition-all  gap-x-2">
                        <Pop theme={item.Binome?.Affectation?.Theme.nom} />
                      </div>
                    </div>
                    <p>
                      {item.Binome?.etudiants.map((s) => (
                        <div
                          className="flex  w-full justify-between   "
                          key={s.nom}
                        >
                          <p className="  text-sm  text-black w-fit ">
                            {s.nom} {s.prenom}
                          </p>
                        </div>
                      ))}
                    </p>

                    <div className="flex gap-x-2">
                      <span className="text-slate-600 text-sm min-w-fit">
                        Encadrant:
                      </span>
                      <p className="flex gap-x-2  text-sm  text-black flex-1 ">
                        {item.Binome?.Affectation?.encadrent?.nom}{" "}
                        {item.Binome?.Affectation?.encadrent?.prenom}{" "}
                      </p>
                    </div>

                    <div className="flex gap-x-2">
                      <span className="text-slate-700 text-[14px]">
                        Président:
                      </span>
                      <p className="flex gap-x-2  text-sm  text-black w-fit ">
                        {item.president ? (
                          <>
                            {" "}
                            {item.president?.nom} {item.president?.prenom}
                          </>
                        ) : (
                          <span className="size-fit px-2 py-1 bg-[#FF00001A] text-[#FF0000] ">
                            Aucune Président associé
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-x-2">
                      <span className="text-slate-600 text-sm">
                        Examinateurs:
                      </span>
                      <p>
                        {!!item.examinateurs.length ? (
                          item.examinateurs?.map((s) => (
                            <div
                              className="flex  w-full justify-between   "
                              key={s.enseignant?.nom}
                            >
                              <p className="  text-sm  text-black w-fit ">
                                {s.enseignant?.nom} {s.enseignant?.prenom}
                              </p>
                            </div>
                          ))
                        ) : (
                          <span className="size-fit px-2 py-1 bg-[#FF00001A] text-[#FF0000] ">
                            Aucune examinateur associé
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-x-4 items-center text-wrap">
                      <span className="text-slate-600 text-[14px]">Salle:</span>
                      <p className="flex gap-x-2  text-sm  text-black w-fit ">
                        {item.salle ? (
                          `Bloc: ${item.salle.bloc} N°: ${item.salle.numero} `
                        ) : (
                          <span className="size-fit px-2 py-1 bg-[#FF00001A] text-[#FF0000] ">
                            Aucune salle associé
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex gap-x-3 items-center ">
                      <span className="text-slate-600 text-[14px]">Heure:</span>
                      <p className="flex gap-x-2  text-sm  text-black w-fit ">
                        {item.heure}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
        <TooltipContent className="w-56 z-40 bg-white" side="bottom">
          <p>{theme}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
