"use client";
import { deleteTheme } from "@/actions/theme";
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

import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface DeleteThemeProp {
  themeId: string;
}

export function DeleteTheme({ themeId }: DeleteThemeProp) {
  const [isPending, startTransition] = useTransition();
  const [close, setClose] = useState(false);
  const onClick = (themeId: string) => {
    startTransition(() => {
      deleteTheme(themeId).then((data) => {
        setClose(true);
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
    <AlertDialog onOpenChange={() => setClose(false)} defaultOpen={false}>
      <AlertDialogTrigger asChild>
        <Trash className=" w-5 h-5 cursor-pointer text-slate-600" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            Voulez-vous vraiment supprimer ce thème ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action supprimera définitivement votre thème.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="uppercase">
          <AlertDialogCancel disabled={isPending} className="cursor-pointer">
            Annuler
          </AlertDialogCancel>
          <Button
            className="cursor-pointer"
            name="delete"
            title="delete"
            onClick={() => onClick(themeId)}
            disabled={isPending}
          >
            supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
