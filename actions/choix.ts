"use server";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { getBinomeId } from "@/lib/getUsers";
import { pusherServer } from "@/lib/pusher";
import { NotificationType } from "@prisma/client";

export const validerChoix = async (themesId: string[]) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }
  const binomeId = await getBinomeId(user.id);

  if (!binomeId) {
    return { error: "Vous devrez d'abord etre affecté à un binome" };
  }
  const etudiantId = await db.binome.findUnique({
    where: {
      id: binomeId,
    },

    include: {
      etudiants: {
        where: {
          id: {
            not: user.id,
          },
        },
        select: {
          id: true,
          nom: true,
          prenom: true,
        },
      },
    },
  });
  const id = etudiantId?.etudiants[0].id;
  const content = `${user.nom} ${user.prenom} a validé ses choix`;

  try {
    await db.choisirTheme.deleteMany({
      where: {
        binomeId: binomeId,
      },
    });
    for (const themeId of themesId) {
      await db.choisirTheme.create({
        data: {
          binomeId,
          themeId,
          etat: "ATTENTE",
        },
      });
    }
    if (id) {
      const notifs = await db.notification.create({
        data: {
          content: content,
          to: { connect: { id: id } },
          type: NotificationType.B_TO_B,
        },
      });
      await pusherServer.trigger(id, "choix", notifs);
      console.log(notifs);
    }

    //revalidatePath(`/u/etudiant/${user.name}/meschoix`);
    return { success: "Vos Choix sont enregistrés!" };
  } catch (e) {
    console.error(e);
    return { error: "Veuillez réessayer" };
  }
};
