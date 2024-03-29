"use client";

import { CirclePlus, CloudDownload } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

import { ImportModel } from "./import-model";
import { AjouterModel } from "../ens/ajouter-ens-form";
import { AjouterEtudiantModel } from "../etud/ajouter-etud-form";
interface ImportButtonProps {
  isEtudiant: boolean;
}

export const ImportButton = ({ isEtudiant }: ImportButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"primary"}
          className=" text-[15px] flex items-center justify-center  h-9 bg-bluesec"
        >
          <CloudDownload className="h-5 w-5 text-white mr-2" color="white" />
          Importer
        </Button>
      </DialogTrigger>
      <ImportModel isEtudiant={isEtudiant} />
    </Dialog>
  );
};
export interface AjouterModelProps {
  specialites: { nom: string }[] | null;
  grades?: { grade: string }[] | null;
  isEnseignant?: boolean;
}

export const AjouterButton = ({
  specialites,
  grades,
  isEnseignant,
}: AjouterModelProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" text-[16px] flex items-center  justify-center h-9 bg-neutral-200 text-bluesec border-[1.5px] hover:bg-neutral-100  px-5">
          <CirclePlus className=" mr-2 text-bluesec" size={20} />
          Ajouter
        </Button>
      </DialogTrigger>
      {isEnseignant && (
        <AjouterModel specialites={specialites} grades={grades} />
      )}
      {!isEnseignant && <AjouterEtudiantModel specialites={specialites} />}
    </Dialog>
  );
};
