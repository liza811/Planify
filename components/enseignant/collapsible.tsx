"use client";

import * as React from "react";
import { ChevronsUpDown, CircleAlert } from "lucide-react";

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
import { AffecterTheme } from "./affecter-theme";
//

interface EncadrantProps {
  attenteListe?: Theme;
  validatedList?: affectations;
  isValidated?: boolean;
  nbEncadrement?: number | null;
  specialites?: { nom: string }[] | null;
  domaines?: { nom: string; id: string }[] | null;
}

export function Encadrant({
  attenteListe,
  isValidated,
  validatedList,
  nbEncadrement,
  specialites,
  domaines,
}: EncadrantProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4 w-full">
        <div className="text-sm font-semibold w-full">
          {validatedList?.Theme || !isValidated ? (
            " Binome affecté à ce thème"
          ) : (
            <div className=" flex justify-between py-2">
              <h4 className="flex gap-x-2 text-rose-500">
                <CircleAlert className="text-rose-500 size-5" />
                Vous devez choisir un thème pour ce binome
              </h4>
              <AffecterTheme
                domaines={domaines}
                specialites={specialites}
                idBinome={validatedList?.Binome.id}
              />
            </div>
          )}
        </div>
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
              className="rounded-md border   w-full text-sm flex justify-between items-center px-4 py-3"
              key={b.id}
            >
              <div className="flex flex-col   gap-y-2">
                {b.binome.etudiants.map((e) => (
                  <div
                    key={e.nom}
                    className="flex gap-x-4 items-center  lowercase"
                  >
                    <p>
                      {e.nom} {e.prenom}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-semibold rounded-md px-2 py-0 text-black "
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
              {!!validatedList &&
              !!nbEncadrement &&
              validatedList.Binome.etudiants.length < nbEncadrement ? (
                ""
              ) : (
                <ValiderBinome
                  binomeId={b.binomeId}
                  themeId={attenteListe.id}
                />
              )}
            </div>
          ))}

        {!!validatedList && isValidated && (
          <div className="flex flex-col  gap-y-2 font-mono text-sm border py-3 px-4 w-full">
            {validatedList.Binome.etudiants.map((e) => (
              <div
                key={e.nom}
                className="flex gap-x-5 items-center justify-start  w-full "
              >
                <p className="w-[50%] text-sm font-medium capitalize">
                  {e.nom.toLowerCase()} {e.prenom.toLowerCase()}
                </p>
                <p className="flex-grow w-full">{e.email.trim()}</p>
                <p
                  className={cn(
                    "text-[13px] font-semibold rounded-md px-2 py-0 text-black w-fit "
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
