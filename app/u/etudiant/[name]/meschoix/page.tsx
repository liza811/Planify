import { Theme } from "@/components/etudiant";

import Intermidiere from "./intermidiere";
import { $Enums } from "@prisma/client";

export interface ExtendedTheme extends Theme {
  etat?: $Enums.Etat;
}

const ChoixPage = async () => {
  return <Intermidiere />;
};

export default ChoixPage;
