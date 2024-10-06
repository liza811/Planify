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
import { ClipLoader } from "react-spinners";

interface DeleteThemeProp {
  themeId: string;
}

export function DeleteTheme({ themeId }: DeleteThemeProp) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const onClick = (themeId: string) => {
    startTransition(() => {
      deleteTheme(themeId).then((data) => {
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
        <Trash className=" w-5 h-5 cursor-pointer text-slate-600" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[340px] md:w-[430px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[15px]">
            {" "}
            Voulez-vous vraiment supprimer ce thème ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Cette action supprimera définitivement votre thème.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="uppercase mt-3 text-sm">
          <AlertDialogCancel
            disabled={isPending}
            className="cursor-pointer focus-visible:ring-0 focus:ring-0"
          >
            Annuler
          </AlertDialogCancel>
          <Button
            className="cursor-pointer w-full md:w-[100px] bg-red-500 hover:bg-red-500/95"
            name="delete"
            title="delete"
            onClick={() => onClick(themeId)}
            disabled={isPending}
          >
            {isPending ? <ClipLoader color="white" size={15} /> : "supprimer"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
