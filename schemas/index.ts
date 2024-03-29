import * as z from "zod";

export const etudiantSchemaInterface = z
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

    specialiteOpt1: z.string().optional(),
    specialiteOpt2: z.string().optional(),
  })

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
export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),

    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(6, {
        message: "Minimum of 6 characters required",
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "Minimum of 6 characters required",
      })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est obligatoire",
  }),
  password: z.string().min(1, {
    message: "mot de passe obligatoire",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "L'email est obligatoire ",
  }),
  password: z.string().min(6, {
    message: "mot de passe obligatoire",
  }),
  name: z
    .string()
    .min(1, {
      message: "Le nom est obligatoire",
    })
    .optional(),
});

export const salleSchema = z.object({
  bloc: z
    .string({
      required_error: "Veuillez saisir le bloc",
    })
    .transform((value) => parseFloat(value.trim()))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Veuillez saisir un nombre positif.",
    }),
  numero: z
    .string({
      required_error: "Veuillez saisir le numero",
    })
    .transform((value) => parseFloat(value.trim()))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Veuillez saisir un nombre positif.",
    }),
});
export const sallesSchema = z
  .object({
    bloc: z
      .string({
        required_error: "Veuillez saisir le bloc",
      })
      .transform((value) => parseFloat(value.trim()))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Veuillez saisir un nombre positif.",
      }),
    numero1: z
      .string({
        required_error: "Veuillez saisir le numero",
      })
      .transform((value) => parseFloat(value.trim()))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Veuillez saisir un nombre positif.",
      }),
    numero2: z
      .string({
        required_error: "Veuillez saisir le numero",
      })
      .transform((value) => parseFloat(value.trim()))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Veuillez saisir un nombre positif.",
      }),
  })
  .refine(
    (data) => {
      if (data.numero1 > data.numero2) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["numero1", "numero2"],
    }
  );
