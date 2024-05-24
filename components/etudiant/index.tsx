"use client";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { ChoixItem } from "./choix-item";
import { useState } from "react";
import { ValiderChoix } from "./valider-choix";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ExtendedTheme } from "@/app/u/etudiant/[name]/meschoix/page";

import { ScrollArea } from "../ui/scroll-area";
import { Configuration } from "@prisma/client";

export type Theme = {
  id: string;
  nom: string;
  proposerId: string;
  createdAt: Date;
  themeSpecialites: ThemeSpecialite[];
  proposePar: Enseignant | null;
};

type ThemeSpecialite = {
  themeId: string;
  specialiteId: string;
  specialite: {
    nom: string;
  };
};

type Enseignant = {
  nom: string;
  prenom: string;
  email: string;
};

export const Main = ({
  themes,
  mesChoix,
  configuration,
}: {
  themes: Theme[];
  mesChoix?: ExtendedTheme[];
  configuration: Configuration | null;
}) => {
  const [choix, setChoix] = useState<ExtendedTheme[]>(mesChoix || []);
  const [allThemes, setAllThemes] = useState<Theme[]>(themes);
  const [themesIds, setThemesIds] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (configuration?.nbChoix &&
        choix.length >= configuration?.nbChoix &&
        source.droppableId !== "CHOIX")
    ) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // if (configuration?.nbChoix && choix.length >= configuration?.nbChoix) {
    //   return;
    // }
    let add;
    let active = allThemes;
    let complete = choix;
    // Source Logic
    if (source.droppableId === "THEMES") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "THEMES") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setChoix(complete);

    setAllThemes(active);
    if (destination.droppableId !== source.droppableId) {
      const ids = complete.map((choix) => choix.id);
      setThemesIds(ids);
      if (themesIds.length === 0) {
        setDisabled(false);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="flex justify-center  w-full h-full   pb-4  ">
        <section className="w-full h-full flex justify-center ">
          <Droppable droppableId="THEMES">
            {(provided, snapshot) => (
              <ScrollArea
                className="flex flex-col gap-y-1 w-96 h-full rounded-lg border bg-slate-100 "
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-semibold bg-white border-b p-3 flex justify-between items-center w-full">
                  {"Thèmes"}
                  <span className="ml-auto rounded-lg bg-slate-200  text-[15px] font-medium  px-3  text-black  flex items-center justify-center">
                    {" "}
                    {allThemes.length}
                  </span>
                </h2>
                <div className="flex flex-col gap-y-4 p-3 px-4 h-full">
                  {themes.map((theme, index) => (
                    <ChoixItem
                      index={index}
                      key={theme.id}
                      nom={theme.nom}
                      id={theme.id}
                      specialite={theme.themeSpecialites}
                      proposePar={
                        `${theme.proposePar?.nom} ${theme.proposePar?.prenom}` ||
                        ""
                      }
                      email={theme.proposePar?.email}
                      nbchoix={choix.length}
                      configurationChoix={configuration?.nbChoix}
                    />
                  ))}
                </div>
                {provided.placeholder}
              </ScrollArea>
            )}
          </Droppable>
        </section>
        <section className="w-full h-full flex justify-center ">
          <div className="flex flex-col items-center pb-2 gap-y-4 w-96 h-full rounded-lg border bg-slate-100 ">
            <Droppable droppableId="CHOIX">
              {(provided, snapshot) => (
                <ScrollArea
                  className="flex flex-col gap-y-4 w-96 h-full  "
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="font-semibold bg-white border-b p-3 flex justify-between items-center w-full">
                    {"Mes choix"}
                    <span className="ml-auto rounded-lg bg-slate-100 text-[15px] font-medium  px-3 py-1 text-black  flex items-center justify-center">
                      {" "}
                      {choix.length}
                      {configuration?.nbChoix
                        ? `/${configuration.nbChoix}`
                        : ""}
                    </span>
                  </h2>
                  <div
                    className={cn(
                      "flex flex-col gap-y-4 p-3 px-4 h-full w-full",
                      choix.length === 0 &&
                        " flex items-center justify-center p-0 "
                    )}
                  >
                    {!choix.length ? (
                      <div className="h-full flex flex-col items-center justify-center w-full mt-12">
                        <p className="text-sm font-semibold">
                          Faites glisser et déposez vos thèmes préférés ici .
                        </p>
                        <span className="text-center text-xs">
                          Vous pouvez les modifier ou les supprimer à tout
                          moment.
                        </span>
                      </div>
                    ) : (
                      <>
                        {choix.map((theme, index) => (
                          <ChoixItem
                            index={index}
                            key={theme.id}
                            nom={theme.nom}
                            id={theme.id}
                            etat={theme.etat}
                            specialite={theme.themeSpecialites}
                            proposePar={
                              `${theme.proposePar?.nom} ${theme.proposePar?.prenom}` ||
                              ""
                            }
                            email={theme.proposePar?.email}
                          />
                        ))}
                      </>
                    )}
                  </div>
                  {provided.placeholder}
                </ScrollArea>
              )}
            </Droppable>
            <div className="mt-auto w-[200px] flex justify-center items-center">
              <ValiderChoix choix={themesIds} disabled={disabled} />
            </div>
          </div>
        </section>
      </main>
    </DragDropContext>
  );
};
