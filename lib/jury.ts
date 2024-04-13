import { currentUser } from "./current-user";
import { db } from "./db";

export const getJury = async () => {
  const user = await currentUser();

  const binomeWithJury = await db.binome.findMany({
    where: {
      etudiants: {
        every: {
          departementId: user?.departementId,
        },
      },
    },
    select: {
      id: true,
      presidentId: true,
      Jury: {
        select: {
          examinateurs: {
            select: {
              examinateurs: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return binomeWithJury;
};
