import { Theme, affectations } from "@/app/u/[name]/binomes/page";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Encadrant } from "./collapsible";
import { stringToColor } from "@/lib/utils";
import Image from "next/image";
import { AjouterBinome } from "./ajouter-binome";
import { getDomaine } from "@/lib/specialite";
import { getAdvancedConfiguration } from "@/lib/configuration";
import { CircleHelp } from "lucide-react";

import { BinomeTerminer } from "./binome-terminer";
import { Etat_Binome } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
interface BinomesInterface {
  validatedList: affectations[];
  attenteListe: Theme[];
  specialites: { nom: string }[] | null;
}

export async function Binomes({
  specialites,
  validatedList,
  attenteListe,
}: BinomesInterface) {
  //const specilaites = await getSpecialites();
  const configuration = await getAdvancedConfiguration();
  const domaines = await getDomaine();
  return (
    <Tabs defaultValue="ATTENTE" className="w-full h-full ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="ATTENTE">En attente</TabsTrigger>
        <TabsTrigger value="VALIDE">Binome validé</TabsTrigger>
      </TabsList>
      <TabsContent value="ATTENTE" className="h-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-[18px]">Thèmes et binômes</CardTitle>
            <CardDescription>
              Découvrez les thèmes choisis et les binômes formés.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 h-full px-2 lg:px-4">
            {!attenteListe.length && (
              <div className="flex flex-col items-center justify-center h-full mt-5">
                <Image
                  src={"/task-searching.png"}
                  height={160}
                  width={160}
                  alt="searching"
                />
                <h1 className="font-semibold mt-3 text-xl">
                  Aucun binôme en attente
                </h1>
              </div>
            )}
            {!!attenteListe &&
              attenteListe.map((list) => (
                <div
                  key={list.id}
                  className="border py-3 px-2"
                  style={{ border: `1px solid ${stringToColor(list.nom)}` }}
                >
                  <p>{list.nom}</p>
                  <Encadrant
                    attenteListe={list}
                    nbEncadrement={configuration?.nbEncadrement}
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="VALIDE" className=" h-full z-30">
        <Card>
          <CardHeader className="space-y-2 px-2 lg:px-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center">
              {" "}
              <CardTitle className="text-[18px]">Binomes validés</CardTitle>
              {((!!configuration?.nbEncadrement &&
                validatedList.length < configuration.nbEncadrement) ||
                (!configuration?.nbEncadrement &&
                  configuration?.nbEncadrement !== null &&
                  configuration?.nbEncadrement !== undefined)) && (
                <AjouterBinome specialites={specialites} domaines={domaines} />
              )}
            </div>
            <CardDescription>
              Consultez les binômes approuvés par vous pour travailler ensemble.
              <br />
              {!!configuration && configuration.nbEncadrement && (
                <span className="flex gap-x-2 text-slate-700 pt-2 items-center">
                  <CircleHelp className="size-4" />
                  {`Vous pouvez avoir jusqu'à ${configuration.nbEncadrement} Encadrement.`}
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 h-full  ">
            {!validatedList.length && (
              <div className="flex flex-col items-center justify-center h-full mt-5">
                <Image
                  src={"/task-searching.png"}
                  height={160}
                  width={160}
                  alt="searching"
                />
                <h1 className="font-semibold mt-3 text-xl">
                  Aucun binôme validé
                </h1>
              </div>
            )}
            {!!validatedList &&
              validatedList.map((v) => (
                <div
                  key={v.Theme?.id}
                  className="border py-3 px-2 rounded-[2px]"
                  style={{
                    border: `1px solid ${stringToColor(v.Theme?.nom || "")}`,
                  }}
                >
                  <div className=" w-full flex  flex-col-reverse gap-y-3 lg:gap-y-0 lg:flex-row justify-between items-start Llg:items-center">
                    <p className="text-[15px]">{v.Theme?.nom}</p>
                    {v.Theme && v.etat === Etat_Binome.NON_TERMINE && (
                      <BinomeTerminer binomeId={v.Binome.id} />
                    )}
                  </div>
                  <Encadrant
                    domaines={domaines}
                    validatedList={v}
                    isValidated
                    specialites={specialites}
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
