"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DeleteEtudButton } from "../ens/delete-button";

export type EnsEtud =
  | {
      nom: string;
      prenom: string;

      email: string;
      matricule: string;
      specialite: string;
      grade?: string;
    }
  | undefined;

export const columnss: ColumnDef<EnsEtud>[] = [
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "prenom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prenom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
  },
  {
    accessorKey: "specialite",
    header: "Spécialié",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <DeleteEtudButton email={row.original?.email || ""} />
        </>
      );
    },
  },
];
