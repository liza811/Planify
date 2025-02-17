import * as z from "zod";

const itemSchema = z.object({
  label: z.string(),
  value: z.string(),
});
export const themeSchema = z.object({
  theme: z.string().min(1, {
    message: "Le thème est obligatoire.",
  }),
  items: z.array(itemSchema),
  domaine: z.string({ required_error: "Le domaine est obligatoire" }),
});

export const enseignantSchemaInterface = z
  .object({
    nom: z.string().min(1, {
      message: "Le nom est obligatoire",
    }),
    prenom: z.string().min(1, {
      message: "Le prénom est obligatoire",
    }),
    email: z.string().email({
      message: "L'email est obligatoire",
    }),
    matricule: z.string().min(1, {
      message: "Le matricule est obligatoire",
    }),

    gradeOp1: z.string().optional(),
    gradeOpt2: z.string().optional(),

    specialiteOpt1: z.string().optional(),
    specialiteOpt2: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.gradeOp1 && data.gradeOpt2) {
        return false;
      }

      return true;
    },
    {
      message: "Vous devrez choisir ou ajouter uniquement ",
      path: ["gradeOp1"],
    }
  )
  .refine(
    (data) => {
      if (!data.gradeOp1 && !data.gradeOpt2) {
        return false;
      }

      return true;
    },
    {
      message: "Vous devrez choisir un grade",
      path: ["gradeOp1"],
    }
  )
  .refine(
    (data) => {
      if (data.specialiteOpt1 && data.specialiteOpt2) {
        return false;
      }

      return true;
    },
    {
      message: "Vous devrez choisir ou ajouter uniquement ",
      path: ["specialiteOpt1"],
    }
  )
  .refine(
    (data) => {
      if (!data.specialiteOpt1 && !data.specialiteOpt2) {
        return false;
      }

      return true;
    },
    {
      message: "Vous devrez choisir une spécialité",
      path: ["specialiteOpt1"],
    }
  );
export const enseignantSchema = [
  "nom",
  "prénom",
  "email",
  "matricule",
  "Spécialité",
  "grade",
];
export const etudiantSchema = [
  "nom",
  "prénom",
  "email",
  "matricule",
  "Spécialité",
];

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est obligatoire",
  }),
  password: z.string().min(1, {
    message: "mot de passe obligatoire",
  }),
  code: z.optional(z.string()),
});

export const binomeSchema = z.object({
  email: z.string().min(1, {
    message: "L' email est obligatoire.",
  }),
  theme: z.string().min(1, {
    message: "Le thème est obligatoire.",
  }),
  items: z.array(itemSchema),
  domaine: z.string({ required_error: "Le domaine est obligatoire" }),
});
