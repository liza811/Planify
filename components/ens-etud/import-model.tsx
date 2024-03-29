"use client";

import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { HoverCardDemo } from "./hover-card";

import { enseignantSchema, etudiantSchema } from "@/schemas";
import { useRef } from "react";
import * as XLSX from "xlsx";

import useStore, { DataItem } from "@/hooks/useStore";
import { FormError } from "../form-error";
interface ImportButtonProps {
  isEtudiant: boolean;
}

export const ImportModel = ({ isEtudiant }: ImportButtonProps) => {
  const {
    fileDataEns,
    error,
    setError,
    setfileDataEns,
    setfileDataEtud,
    fileDataEtud,
    errorEtud,
    savedEtud,
    savedEns,
    setErrorEtud,
  } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (inputRef.current?.files && inputRef.current.files.length > 0) {
      const file = inputRef.current?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
          const binaryString = e.target!.result;
          if (binaryString) {
            const workbook = XLSX.read(binaryString, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData: DataItem[] = XLSX.utils.sheet_to_json(sheet);

            const firstRow = Object.keys(parsedData[0]).map((header) =>
              header.toLowerCase()
            );
            const schemaLowerCase = enseignantSchema.map((header) =>
              header.toLowerCase()
            );

            const validColumns = firstRow.filter((header) =>
              schemaLowerCase.includes(header)
            );

            const missingHeaders = schemaLowerCase.filter(
              (header) => !firstRow.includes(header)
            );
            if (missingHeaders.length > 0) {
              setError(
                `Certains champs requis manquent dans le fichier Excel : ${missingHeaders.join(
                  ", "
                )}`
              );

              setfileDataEns([]);
            } else {
              setfileDataEns(parsedData);

              setError("");
            }
          }
        };

        reader.onerror = (error) => {
          console.error("File reading error:", error);
        };
      }
    } else {
      setError("Veuillez enter un fichier");
    }
  };
  const handleFileUploadEtudiant = () => {
    if (inputRef.current?.files && inputRef.current.files.length > 0) {
      const file = inputRef.current?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
          const binaryString = e.target!.result;
          if (binaryString) {
            const workbook = XLSX.read(binaryString, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData: DataItem[] = XLSX.utils.sheet_to_json(sheet);

            const firstRow = Object.keys(parsedData[0]).map((header) =>
              header.toLowerCase()
            );
            const schemaLowerCase = etudiantSchema.map((header) =>
              header.toLowerCase()
            );

            const missingHeaders = schemaLowerCase.filter(
              (header) => !firstRow.includes(header)
            );
            if (missingHeaders.length > 0) {
              setErrorEtud(
                `Certains champs requis manquent dans le fichier Excel : ${missingHeaders.join(
                  ", "
                )}`
              );

              setfileDataEtud([]);
            } else {
              setfileDataEtud(parsedData);

              setErrorEtud("");
            }
          }
        };

        reader.onerror = (error) => {
          console.error("File reading error:", error);
        };
      }
    } else {
      setErrorEtud("Veuillez enter un fichier");
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px] w-[470px] p-4">
      <DialogHeader>
        <DialogTitle className="text-center mb-3">
          Importer les Enseignants
        </DialogTitle>
        <DialogDescription className="text-center">
          Pour importer des données, veuillez sélectionner un fichier au format
          Excel (.xlsx).
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2 w-full my-3 pl-2">
        <Label
          htmlFor="username"
          className="text-right text-slate-900 font-medium text-[14px] "
        >
          Fichier
        </Label>
        <Input
          ref={inputRef}
          type="file"
          accept=".xlsx, .xls"
          title="Importer un fichier excel"
        />
        {error && <FormError message={error} />}
      </div>

      <DialogFooter className="mt-2 p-0 grid grid-cols-1 gap-2">
        {!isEtudiant && (
          <Button
            type="submit"
            name="import"
            size={"default"}
            title="import"
            onClick={handleFileUpload}
            variant={"primary"}
          >
            Importer
          </Button>
        )}
        {isEtudiant && (
          <Button
            type="submit"
            name="import"
            size={"default"}
            title="import"
            onClick={handleFileUploadEtudiant}
            variant={"primary"}
          >
            Importer
          </Button>
        )}
        <HoverCardDemo />
      </DialogFooter>
    </DialogContent>
  );
};
