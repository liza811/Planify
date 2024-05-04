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

export const AjouterThemes = ({ specialites }: AjouterModelProps) => {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const [close, setClose] = useState(false);
  const [value, setvalue] = useState<string[]>([]);
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
    },
  });

  const onClose = () => {
    setClose(!close);
  };
  const onSubmit = (values: z.infer<typeof themeSchema>) => {
    startTransition(() => {
      ajouterTheme(valuesToSubmit, values.theme)
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
    });

    form.reset();
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
    <Dialog>
      <DialogTrigger className="flex gap-x-2 capitalize">
        <Button>
          <PlusCircleIcon className="h-5 w-5 mr-2 " />
          Ajouter un thème
        </Button>
      </DialogTrigger>

      <DialogContent className=" md:w-[450px] w-[350px] p-5  max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center mb-3">
            {"Ajouter un Theme"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thème</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description du thème"
                      className="resize-none focus-visible:none"
                      {...field}
                    />
                  </FormControl>
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
                      <FormLabel>Spécialitée</FormLabel>
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
                className="bg-bluesec"
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
