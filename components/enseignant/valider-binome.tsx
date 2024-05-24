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

import { useState, useTransition } from "react";
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
  const [open, setOpen] = useState(false);
  const onClick = (themeId: string, binomeId: string) => {
    startTransition(() => {
      validerBinome(binomeId, themeId).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.success(data.error);
        }
        setOpen((open) => !open);
      });
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-sm bg-primary_blue/80 text-white hover:bg-primary_blue hover:text-white "
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
