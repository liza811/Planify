"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import { resetIndisponibilite } from "@/actions/indisponibilite";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

export const ResetButton = () => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(() => {
      resetIndisponibilite().then((data) => {
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
    <Button
      type="button"
      disabled={isPending}
      onClick={onClick}
      className="w-[60%] mt-auto"
    >
      {isPending ? <ClipLoader color="white" size={15} /> : "reset"}
    </Button>
  );
};
