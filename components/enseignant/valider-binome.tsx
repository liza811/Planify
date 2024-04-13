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

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ClipLoader } from "react-spinners";
import { validerBinome } from "@/actions/binome";

interface DeleteThemeProp {
  binomeId: string;
  themeId: string;
}

export function ValiderBinome({ binomeId, themeId }: DeleteThemeProp) {
  const [isPending, startTransition] = useTransition();
  const onClick = (themeId: string, binomeId: string) => {
    startTransition(() => {
      validerBinome(binomeId, themeId).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.success(data.error);
        }
      });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-sm bg-[#33D69F1A] text-[#33D69F] hover:bg-[#33D69FBB] hover:text-white "
          size={"sm"}
        >
          valider
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Affecter un thème</AlertDialogTitle>
          <AlertDialogDescription>
            Vous serez automatiquement l&apos;encadrant de ce binome.
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
            onClick={() => onClick(themeId, binomeId)}
            disabled={isPending}
          >
            {isPending ? <ClipLoader color="white" size={15} /> : "Valider"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
