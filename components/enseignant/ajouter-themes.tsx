"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { themeSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";

import { toast } from "sonner";
import { AjouterModelProps } from "@/app/u/[name]/themes/page";
import { Textarea } from "../ui/textarea";
import { PlusCircleIcon } from "lucide-react";
import { ajouterTheme } from "@/actions/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const AjouterThemes = ({
  specialites,
  domaines,
  nbTheme,
  nbPropose,
}: AjouterModelProps) => {
  const disable =
    !!nbPropose && !!nbTheme && nbPropose >= nbTheme ? true : false;
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [valuesToSubmit, setValuesToSubmit] = useState<string[]>([]);
  const options = specialites?.map((item) => ({
    label: item.nom,
    value: item.nom,
  }));

  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: "",
      items: [],
      domaine: "",
    },
  });
  const onClose = () => {
    setOpen((open) => !open);
  };
  const onSubmit = (values: z.infer<typeof themeSchema>) => {
    if (!values.domaine) {
      toast.error("Vous devez selectionner un domaine!");
    } else if (valuesToSubmit.length === 0) {
      toast.error("Vous devez selectionner au moins une spécialitée!");
    } else {
      startTransition(() => {
        ajouterTheme(valuesToSubmit, values.theme, values.domaine)
          .then((data) => {
            if (data.error) {
              toast.error(data.error);
              form.reset();
            }
            if (data.success) {
              toast.success(data.success);
              form.reset();
            }
          })
          .catch(() => toast.error("Something went wrong!"));
        setOpen((open) => !open);
      });

      form.reset();
    }
  };
  useEffect(() => {
    // Update the values to submit whenever selectedValues changes
    setValuesToSubmit(selectedValues);
  }, [selectedValues]);

  const handleOnChange = (selectedListString: string) => {
    const newSelectedValues =
      selectedListString.trim() === ""
        ? []
        : selectedListString.includes(",")
        ? selectedListString.split(",")
        : [selectedListString];
    // console.log(newSelectedValues);
    setSelectedValues(newSelectedValues);
  };

  // onOpenChange={setClose} open={!close}
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex gap-x-2 capitalize">
        <Button disabled={disable}>
          <PlusCircleIcon className="h-5 w-5 mr-2 " />
          Ajouter un thème
        </Button>
      </DialogTrigger>

      <DialogContent className=" md:w-[450px] w-[350px] p-5  max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center mb-3">
            {"Ajouter un Thème"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thème:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description du thème"
                      className="resize-none focus-visible:none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domaine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domaine:</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-zinc-200/80 border-0 focus:ring-0 text-slate-500 ring-offset-0 focus:ring-offset-0 capitalize outline-none dark:bg-zinc-700/50 dark:text-white min-w-48">
                        <SelectValue placeholder="Choisir un domaine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {domaines?.map((specialite) => (
                        <SelectItem key={specialite.nom} value={specialite.id}>
                          {specialite.nom.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" w-full">
              {!!specialites && (
                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem className="w-full">
                      <FormLabel>Spécialitée:</FormLabel>
                      <FormControl>
                        <MultiSelect
                          onChange={handleOnChange}
                          options={options}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <DialogFooter className="flex justify-center gap-y-3 w-full">
              <Button
                className="sm:mr-auto "
                disabled={isPending}
                type="reset"
                variant={"secondary"}
                name="saves"
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                variant={"primary"}
                name="saves"
                className="bg-primary_blue"
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
