import { Suspense } from "react";

import { Loader } from "../../_components/loader";
import { Binome } from "./binomes";
import { Etat_Binome } from "@prisma/client";

export interface ChoisirTheme {
  id: string;
  etat: string;
  binomeId: string;
  themeId: string;
  binome: {
    id: string;
    etudiants: {
      nom: string;
      prenom: string;
      specialite?: {
        nom: string | null;
      } | null;
    }[];
  };
}

export interface Theme {
  id: string;
  nom: string;
  ChoisirTheme: ChoisirTheme[];
}

export interface affectations {
  etat: Etat_Binome;
  Binome: {
    id: string;
    etudiants: {
      nom: string;
      prenom: string;
      email: string;
      specialite: {
        nom: string;
      } | null;
    }[];
  };
  Theme: {
    nom: string;
    id: string;
  } | null;
}
const BinomePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Binome />
    </Suspense>
  );
};

export default BinomePage;
