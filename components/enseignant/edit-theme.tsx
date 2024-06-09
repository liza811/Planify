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

import { Textarea } from "../ui/textarea";
import { Edit, X } from "lucide-react";
import { updateTheme } from "@/actions/theme";
import { ThemeSpecialites } from "./theme-item";
import { themeSchema } from "@/schemas";
import { useRouter } from "next/navigation";

interface EditThemeProps {
  themeId: string;
  specialites: ThemeSpecialites;
  nom: string;
  allSpecialites: { nom: string }[] | null;
}
interface Option {
  label: string;
  value: string; // Assuming filteredList contains strings
}
export const EditTheme = ({
  specialites,
  nom,
  allSpecialites,
  themeId,
}: EditThemeProps) => {
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const allSpecialitesNames: string[] =
    allSpecialites?.map((item) => item?.nom) || [];
  const themeSpecialitesNames: string[] = specialites.map(
    (s) => s.specialite.nom
  );
  const [autre, setAutre] = useState<string[]>(themeSpecialitesNames);
  const filteredList = allSpecialitesNames.filter(
    (element) => !themeSpecialitesNames.includes(element)
  );

  const [valuesToSubmit, setValuesToSubmit] = useState<string[]>();
  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: nom || "",
      items: [],
    },
  });
  const onClose = () => {
    setOpen((open) => !open);
  };
  const onSubmit = (values: z.infer<typeof themeSchema>) => {
    const allValues = selectedValues.concat(autre);

    startTransition(() => {
      updateTheme(allValues, values.theme, themeId)
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
      setAutre(allValues);
      setOpen((open) => !open);
    });

    form.reset();
  };
  useEffect(() => {
    setIsMounted(true);
    router.refresh();
    if (filteredList) {
      const newOptions = filteredList.map((item) => ({
        label: item,
        value: item,
      }));
      setOptions(newOptions);
    } else {
      setOptions([]);
    }
    const allValues = selectedValues.concat(autre);

    // setValuesToSubmit(selectedValues);
  }, [autre, selectedValues]);

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

  const handleSpecialiteClick = (specialite: string) => {
    setAutre((prevAutre) => prevAutre.filter((item) => item !== specialite));
    const existingOption = options.find(
      (option) => option.label === specialite
    );

    if (!existingOption) {
      const newOption = { label: specialite, value: specialite };
      setOptions((prevOptions) => [...prevOptions, newOption]);
    }
  };

  if (!isMounted) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex gap-x-2 capitalize">
        <Edit className=" w-5 h-5 cursor-pointer" />
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
                      defaultValue={nom || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-1.5">
              {autre?.map((i) => (
                <p
                  className="font-medium text-sm rounded-md py-1 px-1.5 bg-slate-100 flex justify-between items-center gap-x-3"
                  key={i}
                >
                  {i}
                  <X
                    className=" size-4  rounded-full  bg-slate-200 text-slate-600 font-extralight cursor-pointer"
                    onClick={() => handleSpecialiteClick(i)}
                  />
                </p>
              ))}
            </div>
            <div className=" w-full">
              {!!allSpecialites && (
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
