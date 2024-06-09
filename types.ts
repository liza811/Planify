export type Soutenance = {
  idBinome: string;
  encadrant: string;
  salle?: string;
  date?: string;
  heure?: string;
  president?: String;
  examinateurs?: String[];
};
export interface Salle {
  nom: string;
  indisponibilite?: string[];
}
export interface IndisponibiliteJury {
  idJury: string;
  datesIndisponibles: string[];
}

export type ResultatPlanification = {
  resultats: Soutenance[];
};

export type Binome = {
  idBinome: string;
  theme?: string[];

  encadrant: string;
};
export type Enseignant = {
  nom: string;
  grade: string;
  specialite: string;
  poids: number;
};
export interface DatesIndisponibles {
  from: string;
  to: string;
}
export type planning = {
  salle: Sallee | null;
  date: string | null;
  heure: string | null;
  examinateurs: Examinateur[];
  Binome: Binomee | null;
  id: number;
  president: President | null;
};

export type Examinateur = {
  enseignant: {
    nom: string;
    prenom: string;
  };
};

export type Binomee = {
  Affectation: Affectation | null;
  etudiants: Etudiant[];
};
export interface Configuration {
  id: string;
  dateDebut: Date;
  dateFin: Date;
  heureDebut: string;
  heureFin: string;
  duree: string;
  departementId: string;
}

type Affectation = {
  Theme: {
    nom: string;
  } | null;
  encadrent: Enseignantt | null;
};

export type Etudiant = {
  nom: string;
  prenom: string;
};

export type President = {
  nom: string;
  prenom: string;
};

export type Enseignantt = {
  nom: string;
  prenom: string;
};
export type Sallee = {
  bloc: number;
  numero: number;
};
