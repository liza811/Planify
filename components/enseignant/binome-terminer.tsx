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
import { binomeTerminer } from "@/actions/binome";

interface DeleteThemeProp {
  binomeId: string;
}

export function BinomeTerminer({ binomeId }: DeleteThemeProp) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const onClick = (binomeId: string) => {
    startTransition(() => {
      binomeTerminer(binomeId).then((data) => {
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
        <Button className=" h-9  border-slate-400" variant={"outline"}>
          Confirmer la soutenance
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Validation de la Soutenance</AlertDialogTitle>
          <AlertDialogDescription>
            En validant cette action, vous confirmez que la soutenance de ce
            binôme se passera en session normale.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="uppercase">
          <AlertDialogCancel disabled={isPending} className="cursor-pointer">
            Annuler
          </AlertDialogCancel>
          <Button
            className="cursor-pointer w-[100px]"
            name="valider"
            title="valider"
            onClick={() => onClick(binomeId)}
            disabled={isPending}
          >
            {isPending ? <ClipLoader color="white" size={15} /> : "Valider"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
