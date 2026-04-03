import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().nonempty("Le mot de passe est requis"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;