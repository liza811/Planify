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
import { getSpecialites } from "@/lib/specialite";
import { getConfiguration } from "@/lib/configuration";
import { CircleHelp } from "lucide-react";
interface BinomesInterface {
  validatedList: affectations[];
  attenteListe: Theme[];
}

export async function Binomes({
  validatedList,
  attenteListe,
}: BinomesInterface) {
  const specilaites = await getSpecialites();
  const configuration = await getConfiguration();
  return (
    <Tabs defaultValue="ATTENTE" className="w-full h-full">
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
          <CardContent className="space-y-2 h-full ">
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
      <TabsContent value="VALIDE" className="h-full">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              {" "}
              <CardTitle className="text-[18px]">Binomes validés</CardTitle>
              {!!validatedList &&
                !!configuration?.nbEncadrement &&
                validatedList.length < configuration.nbEncadrement && (
                  <AjouterBinome specialites={specilaites} />
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
          <CardContent className="space-y-2 h-full ">
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
                  className="border py-3 px-2"
                  style={{
                    border: `1px solid ${stringToColor(v.Theme?.nom || "")}`,
                  }}
                >
                  <p className="text-[15px]">{v.Theme?.nom}</p>
                  <Encadrant validatedList={v} isValidated />
                </div>
              ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
