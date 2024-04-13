"use client";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { validerChoix } from "@/actions/choix";
import { ClipLoader } from "react-spinners";

import { pusherClient } from "@/lib/pusher";
import useNotificationStore from "@/hooks/useStore";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Notification } from "@prisma/client";

interface DeleteThemeProp {
  choix: string[];
}

export function ValiderChoix({ choix }: DeleteThemeProp) {
  const { addNotification, setNew } = useNotificationStore();
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const binomeId: string = user?.id!;
  useEffect(() => {
    const handleMessage = (data: Notification) => {
      addNotification(data);
      setNew(true);
    };

    if (binomeId) {
      pusherClient.subscribe(binomeId!);
      pusherClient.bind("choix", handleMessage);

      return () => {
        pusherClient.unbind("choix", handleMessage);
        pusherClient.unsubscribe(binomeId!);
      };
    }
  }, [addNotification, binomeId]);

  const onClick = (choixIds: string[]) => {
    startTransition(() => {
      validerChoix(choixIds).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {" "}
          Voulez-vous vraiment valider vos choix ?
          <br />
        </AlertDialogTitle>
        <AlertDialogDescription>
          Vous pouvez toujours modifier vos choix après.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="uppercase">
        <AlertDialogCancel disabled={isPending} className="cursor-pointer">
          Annuler
        </AlertDialogCancel>
        <Button
          className="cursor-pointer w-[100px]"
          name="delete"
          title="delete"
          onClick={() => onClick(choix)}
          disabled={isPending}
        >
          {isPending ? <ClipLoader color="white" size={15} /> : "Enregistrer"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
