import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import "react-multiple-select-dropdown-lite/dist/index.css";

import { CalendarIcon, CircleHelp } from "lucide-react";

import { Typography } from "@mui/material";
import { getIndisponibilite } from "@/lib/indisponibilite";
import { getConfiguration } from "@/lib/configuration";
import { ResetButton } from "./reset-indisponibilite-button";
import { DatePickerWithRange } from "./date-picker";

export interface DatesIndisponibles {
  from: string;
  to: string;
}
export const AjouterIndispo = async () => {
  const indisponibilites: DatesIndisponibles | any = await getIndisponibilite();

  const indispo =
    indisponibilites?.datesIndisponibles as unknown as DatesIndisponibles;
  const fromDate = indispo?.from;
  const toDate = indispo?.to;

  const configuration = await getConfiguration();

  return (
    <Dialog>
      <DialogTrigger className="flex gap-x-2 ">
        <div className=" rounded-md  h-[80px] flex items-center w-full border border-[#6889FF] shadow-lg hover:shadow-2xl hover:border-2 hover:transition-all ">
          <Typography
            sx={{
              color: "#3D007B",
              fontFamily: "monospace",
              mt: 0,
              fontSize: 19,
              mr: 0,
              marginLeft: 7,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            Déclarer mes jours d&apos;indisponibilités
          </Typography>
        </div>
      </DialogTrigger>

      <DialogContent className=" md:w-[450px] w-[350px] p-5  max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center mb-3">
            Ajouter vos jours d &apos; indisponibilités
          </DialogTitle>
          <DialogDescription className="w-full">
            {" "}
            <DatePickerWithRange
              dateDebut={configuration?.dateDebut}
              dateFin={configuration?.dateFin}
              nbDateIndispo={configuration?.nbDateIndispo}
            />
          </DialogDescription>
        </DialogHeader>
        {!!indisponibilites && !!indispo && (
          <div className="space-y-4 border-t border-slate-500 w-full py-4 flex flex-col">
            {fromDate === toDate ? (
              <p className="flex justify-between text-slate-700">
                <span className="w-full flex gap-x-2">
                  <CalendarIcon />`{fromDate}
                </span>
              </p>
            ) : (
              <>
                <p className="flex justify-between text-slate-700">
                  <span className="w-full flex gap-x-2">
                    <CalendarIcon />

                    {fromDate}
                  </span>
                </p>
                <p className="flex justify-between text-slate-700">
                  <span className="w-full flex gap-x-2 capitalize">
                    <CalendarIcon />
                    {toDate}
                  </span>
                </p>
              </>
            )}

            <ResetButton />
          </div>
        )}
        {!!configuration && configuration.nbDateIndispo && (
          <span className="flex gap-x-2 text-slate-700  text-sm">
            <CircleHelp className="size-5" />
            {` Vous ne pouvez pas déclarer plus de ${configuration.nbDateIndispo} jours d'indisponibilitées.`}
          </span>
        )}
      </DialogContent>
    </Dialog>
  );
};
