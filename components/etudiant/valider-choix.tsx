"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { validerChoix } from "@/actions/choix";
import { ClipLoader } from "react-spinners";

import { pusherClient } from "@/lib/pusher";
import useNotificationStore from "@/hooks/useStore";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Notification } from "@prisma/client";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteThemeProp {
  choix: string[];
  disabled: boolean;
}

export function ValiderChoix({ choix, disabled }: DeleteThemeProp) {
  const { addNotification, setNew } = useNotificationStore();
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
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
  }, [addNotification, binomeId, setNew]);

  const onClick = (choixIds: string[]) => {
    startTransition(() => {
      validerChoix(choixIds).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
        setOpen((open) => !open);
      });
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className=" w-full ">
        <Button className={cn("flex gap-x-2")} disabled={disabled}>
          <CheckCircle className=" w-4 h-4 cursor-pointer text-white" />
          {"Valider"}
        </Button>
      </AlertDialogTrigger>
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
    </AlertDialog>
  );
}
