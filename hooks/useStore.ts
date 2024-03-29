import { create } from "zustand";

interface DataState {
  fileDataEns: DataItem[] | null;
  fileDataEtud: DataItem[] | null;
  error: string | null;
  errorEtud: string | null;
  savedEns: boolean;
  savedEtud: boolean;
  setfileDataEns: (data: DataItem[]) => void;
  setfileDataEtud: (data: DataItem[]) => void;
  setError: (message: string) => void;
  setErrorEtud: (message: string) => void;
  setsavedEns: (message: boolean) => void;
  setsavedEtud: (message: boolean) => void;
}
export interface DataItem {
  Nom: string;
  Prenom: string;
  Email: string;
  Matricule: string;
  Spécialité: string;
  Grade?: string;
}

const useStore = create<DataState>((set) => ({
  fileDataEns: null,
  fileDataEtud: null,
  savedEns: false,
  savedEtud: false,
  setfileDataEns: (data: DataItem[]) => set({ fileDataEns: data }),
  setfileDataEtud: (data: DataItem[]) => set({ fileDataEtud: data }),
  error: null,
  errorEtud: null,
  setError: (message: string | null) => set({ error: message }),
  setErrorEtud: (message: string | null) => set({ errorEtud: message }),
  setsavedEns: (message: boolean) => set({ savedEns: message }),
  setsavedEtud: (message: boolean) => set({ savedEtud: message }),
}));
export default useStore;
