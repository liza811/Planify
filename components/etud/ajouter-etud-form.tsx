"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { etudiantSchemaInterface } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AjouterModelProps } from "../ens-etud/import-ajouter-button";
import { addEtudiant } from "@/actions/add-enseignant";
import { toast } from "sonner";

export const AjouterEtudiantModel = ({ specialites }: AjouterModelProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof etudiantSchemaInterface>>({
    resolver: zodResolver(etudiantSchemaInterface),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      matricule: "",
      specialiteOpt1: "",
    },
  });
  const onSubmit = (values: z.infer<typeof etudiantSchemaInterface>) => {
    const specialite = values.specialiteOpt1 || values.specialiteOpt2;

    startTransition(() => {
      addEtudiant(specialite!, values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
    form.reset();
  };

  return (
    <DialogContent className=" md:w-[490px] w-[400px] p-5 overflow-y-scroll max-h-[95vh]">
      <DialogHeader>
        <DialogTitle className="text-center mb-3">
          Ajouter un Etudiant
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nom" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Prénom"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@se-univ.dz"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matricule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matricule</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Matricule"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex  justify-between space-x-3 w-full">
              {specialites && (
                <FormField
                  control={form.control}
                  name="specialiteOpt2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spécialité</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-200/80 border-0 focus:ring-0 text-slate-500 ring-offset-0 focus:ring-offset-0 capitalize outline-none dark:bg-zinc-700/50 dark:text-white w-full">
                            <SelectValue placeholder="Choisir une spécialité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialites.map((specialite) => (
                            <SelectItem
                              key={specialite.nom}
                              value={specialite.nom}
                            >
                              {specialite.nom.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="specialiteOpt1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ajouter une spécialité</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="spécialité"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-center gap-y-3 w-full">
            <Button
              className="sm:mr-auto "
              disabled={isPending}
              type="button"
              variant={"secondary"}
              name="saves"
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
  );
};
