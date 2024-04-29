import { Soutenance } from "./page";

type DateStr = string;
export const Results = ({
  resultat,
}: {
  resultat: (string | Soutenance)[];
}) => {
  return <div className="grid grid-cols-1 gap-4 w-fit"></div>;
};
