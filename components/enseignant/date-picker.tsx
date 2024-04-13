"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AddIndisponibilite } from "@/actions/indisponibilite";
import { ClipLoader } from "react-spinners";

export interface configurationInterface {
  className?: React.HTMLAttributes<HTMLDivElement>;
  dateDebut: Date | undefined;
  dateFin: Date | undefined;
}

export function DatePickerWithRange({
  className,
  dateDebut,
  dateFin,
}: configurationInterface) {
  const [date, setDate] = useState<DateRange | undefined>({
    // from: new Date(2022, 0, 20),
    // to: addDays(new Date(2022, 0, 20), 20),
    from: new Date(dateDebut?.toDateString() || new Date()) as Date,
    to: new Date(dateFin?.toDateString() || new Date()),
  });
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      AddIndisponibilite(
        date?.from?.toLocaleDateString(),
        date?.to?.toLocaleDateString() || date?.from?.toLocaleDateString()
      ).then((data) => {
        if (data?.success) {
          toast.success(data.success);
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button type="submit" onClick={onClick} className="mt-2">
        {isPending ? <ClipLoader color="white" size={15} /> : "Enregistrer"}
      </Button>
    </div>
  );
}
