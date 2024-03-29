"use client";
import useStore, { DataItem } from "@/hooks/useStore";
import { DataTable } from "./data-table";
import { columns } from "../ens/columns";

import { NothingFound } from "../nothing-found";
import { ValiderButton } from "../ens/valider-button";
import { ValiderButtonEtud } from "../etud/valider-button";
import { columnss } from "../etud/columns";

export interface Ens {
  nom: string;
  prenom: string;
  email: string;
  matricule: string;
  specialite: string;
  grade?: string;
}

export const TableEns = ({ formattedEns }: { formattedEns: Ens[] }) => {
  const { fileDataEns, savedEns } = useStore();

  const formattedData =
    fileDataEns?.map((data) => ({
      nom: getCaseInsensitiveProperty(data, "Nom", ""),
      prenom: getCaseInsensitiveProperty(data, "Prénom", ""),
      email: getCaseInsensitiveProperty(data, "email", ""),
      matricule: getCaseInsensitiveProperty(data, "Matricule", ""),

      specialite: getCaseInsensitiveProperty(data, "spécialité", ""),
      grade: getCaseInsensitiveProperty(data, "Grade", "") || undefined,
    })) ?? [];

  const combinedData = [...formattedData, ...formattedEns];
  if (formattedData.length > 0) {
    return (
      <section className=" flex flex-col w-full h-full flex-1 ">
        <div className="w-full bg-white p-3 py-0 ">
          <DataTable columns={columns} data={combinedData} />
        </div>
        <div className="flex items-end justify-end w-full mt-auto  ">
          <ValiderButton />
        </div>
      </section>
    );
  }
  // if there is enseignants in db show them
  if (formattedEns) {
    return (
      <section className=" flex flex-col w-full h-full flex-1 ">
        <div className="w-full bg-white p-3 py-0 ">
          <DataTable columns={columns} data={formattedEns} />
        </div>
        <div className="flex items-end justify-end w-full mt-auto  ">
          <ValiderButton />
        </div>
      </section>
    );
  }

  return (
    <section className=" flex flex-col w-full h-full ">
      <NothingFound
        header="Aucun Enseignant Trouvé!"
        paragraph=" Importer vos enseignants a partir d'un fichier excel"
      />
    </section>
  );
};

export const TableEtud = ({ formattedEtud }: { formattedEtud: Ens[] }) => {
  const { fileDataEtud, savedEtud } = useStore();

  const formattedData =
    fileDataEtud?.map((data) => ({
      nom: getCaseInsensitiveProperty(data, "Nom", ""),
      prenom: getCaseInsensitiveProperty(data, "Prénom", ""),
      email: getCaseInsensitiveProperty(data, "email", ""),
      matricule: getCaseInsensitiveProperty(data, "Matricule", ""),

      specialite: getCaseInsensitiveProperty(data, "spécialité", ""),
    })) ?? [];
  console.log(formattedData);

  const combinedData = [...formattedData, ...formattedEtud];
  if (formattedData.length > 0) {
    return (
      <section className=" flex flex-col w-full h-full flex-1 ">
        <div className="w-full bg-white p-3 py-0 ">
          <DataTable columns={columnss} data={combinedData} />
        </div>
        <div className="flex items-end justify-end w-full mt-auto  ">
          <ValiderButtonEtud />
        </div>
      </section>
    );
  }
  // if there is etudiants in db show them
  if (formattedEtud) {
    return (
      <section className=" flex flex-col w-full h-full flex-1 ">
        <div className="w-full bg-white p-3 py-0 ">
          <DataTable columns={columnss} data={formattedEtud} />
        </div>
        <div className="flex items-end justify-end w-full mt-auto  ">
          <ValiderButtonEtud />
        </div>
      </section>
    );
  }

  return (
    <section className=" flex flex-col w-full h-full ">
      <NothingFound
        header="Aucun Etudiant Trouvé!"
        paragraph=" Importer vos etudiants a partir d'un fichier excel"
      />
    </section>
  );
};

export function getCaseInsensitiveProperty(
  obj: DataItem,
  propertyName: string,
  defaultValue = ""
): string {
  return (
    Object.entries(obj)
      .reduce(
        (acc, [key]) =>
          //@ts-ignore
          key.toLowerCase() === propertyName.toLowerCase() ? obj[key] : acc,
        defaultValue
      )
      ?.toString() || defaultValue
  );
}
