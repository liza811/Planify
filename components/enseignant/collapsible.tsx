"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Theme, affectations } from "@/app/u/[name]/binomes/page";
import { cn, stringToColor } from "@/lib/utils";
import { hexToRgba } from "../etudiant/choix-item";
import { ValiderBinome } from "./valider-binome";

interface EncadrantProps {
  attenteListe?: Theme;
  validatedList?: affectations;
  isValidated?: boolean;
}

export function Encadrant({
  attenteListe,
  isValidated,
  validatedList,
}: EncadrantProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          Binomes qui ont choisi ce thème
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2">
        {!!attenteListe &&
          !isValidated &&
          attenteListe.ChoisirTheme.map((b) => (
            <div
              className="rounded-md border   font-mono text-sm flex justify-between items-center px-4 py-3"
              key={b.id}
            >
              <div className="flex flex-col   gap-y-2">
                {b.binome.etudiants.map((e) => (
                  <div key={e.nom} className="flex gap-x-4 items-center ">
                    <p>
                      {e.nom} {e.prenom}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-semibold rounded-lg px-2 py-0 text-black "
                      )}
                      style={{
                        color: `${stringToColor(e.specialite?.nom || "")}`,
                        backgroundColor: hexToRgba(
                          stringToColor(e.specialite?.nom || ""),
                          0.2
                        ),
                      }}
                    >
                      {e.specialite?.nom}
                    </p>
                  </div>
                ))}
              </div>

              <ValiderBinome binomeId={b.binomeId} themeId={attenteListe.id} />
            </div>
          ))}

        {!!validatedList && isValidated && (
          <div className="flex flex-col  gap-y-2 font-mono text-sm border py-3 px-4 sm:w-[500px] w-full">
            {validatedList.Binome.etudiants.map((e) => (
              <div
                key={e.nom}
                className="flex gap-x-5 items-center justify-around w-full "
              >
                <p className="w-[50%] text-sm font-medium">
                  {e.nom} {e.prenom}
                </p>
                <p className="flex-grow w-full">{e.email}</p>
                <p
                  className={cn(
                    "text-sm font-semibold rounded-lg px-2 py-0 text-black w-[8%] "
                  )}
                  style={{
                    color: `${stringToColor(e.specialite?.nom || "")}`,
                    backgroundColor: hexToRgba(
                      stringToColor(e.specialite?.nom || ""),
                      0.2
                    ),
                  }}
                >
                  {e.specialite?.nom}
                </p>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
