import { IndisponibiliteJury } from "@/app/u/[name]/calendar/page";
import { currentUser } from "./current-user";
import { db } from "./db";

export const getIndisponibilite = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const indisponibilite = await db.enseignant.findFirst({
    where: {
      id: user.id,
    },
    select: {
      datesIndisponibles: true,
    },
  });

  return indisponibilite;
};

export async function getEnseignantsWithIndisponibilites() {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  try {
    const enseignants = await db.enseignant.findMany({
      where: {
        departementId: user.departementId,
      },
      select: {
        id: true,
        datesIndisponibles: true,
      },
    });

    return enseignants;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Usage
// getEnseignantsWithIndisponibilites().then((data) => {
//   console.log(data);
// });
