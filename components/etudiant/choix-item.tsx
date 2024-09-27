"use client";

import { cn, stringToColor } from "@/lib/utils";
import { $Enums, Etat } from "@prisma/client";

import { Draggable } from "react-beautiful-dnd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Check, CircleHelp, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface Speciality {
  specialite: {
    nom: string;
  };
}

type ThemeSpecialites = Speciality[];
interface ThemeItemProps {
  nom: string;
  id: string;
  index: number;
  etat?: $Enums.Etat;
  specialite?: ThemeSpecialites;
  proposePar: string;
  email?: string;
  nbchoix?: number;
  configurationChoix?: number | null;
}
export const ChoixItem = ({
  nom,
  specialite,
  proposePar,
  id,
  index,
  etat,
  email,
  nbchoix,
  configurationChoix,
}: ThemeItemProps) => {
  const [copied, setCopied] = useState(false);
  const etatColor = {
    [Etat.ATTENTE]: "bg-[#ff8F001A] text-[#ff8F00]",
    [Etat.REFUSE]: "bg-[#FF00001A] text-[#FF0000]",
    [Etat.VALIDE]: "bg-[#33D69F1A] text-[#33D69F]",
  };
  const etatText = {
    [Etat.ATTENTE]: "attente",
    [Etat.REFUSE]: "refusé",
    [Etat.VALIDE]: "validé",
  };

  const onCopy = () => {
    navigator.clipboard.writeText(email || "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={cn(
            "flex flex-col bg-white shadow-md rounded-sm justify-between group cursor-grab scale-103",
            snapshot.isDragging && ` border rounded-sm border-primary_purpule`,
            configurationChoix && nbchoix
              ? `${
                  nbchoix >= configurationChoix
                    ? `border-red-600`
                    : `border-primary_purpule`
                }`
              : `border-primary_purpule`
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between w-full p-2 items-center py-2">
            <div className="w-full flex gap-x-2   flex-wrap gap-y-1 flex-1">
              {specialite?.map((s) => (
                <p
                  className={cn(
                    "text-xs font-semibold rounded-lg px-3 py-1 text-black "
                  )}
                  style={{
                    color: `${stringToColor(s.specialite.nom.concat("."))}`,
                    backgroundColor: hexToRgba(
                      stringToColor(s.specialite.nom.concat(".")),
                      0.2
                    ),
                  }}
                  key={s.specialite.nom}
                >
                  {s.specialite.nom}
                </p>
              ))}
            </div>
            {/* <CircleMinus
              className="text-slate-500 cursor-pointer"
              size={17}
              onClick={onClick}
            /> */}
          </div>
          <div className="w-full px-3 pt-2 rounded-sm text-[13px] font-medium text-wrap capitalize ">
            {nom}
          </div>
          {/* <div className="w-full h-[1px]  bg-slate-300 rounded-lg" /> */}
          <div className="p-2  flex justify-between items-center">
            <div className="flex gap-x-2 text-slate-700 text-xs  mt-3 items-center">
              {email && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelp className="text-slate-600 w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className=" flex gap-x-3 items-center"
                    >
                      <p>{email}</p>

                      <Button
                        size={"icon"}
                        className="bg-transparent hover:bg-neutral-100 py-0 h-6"
                        onClick={onCopy}
                      >
                        {copied ? (
                          <Check className="size-4 " color="black" />
                        ) : (
                          <CopyIcon className="size-4" color="black" />
                        )}
                      </Button>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <span className="capitalize"> {proposePar.toLowerCase()}</span>
            </div>
            <p
              className={cn(
                "flex  text-slate-700 text-xs capitalize mt-3 px-3 py-1 rounded-md font-semibold",
                etat && etatColor[etat]
              )}
            >
              {etat && etatText[etat]}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
