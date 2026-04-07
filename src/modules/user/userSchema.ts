import { z } from "zod";



export const idUserSchema = z.object({
    id: z.string().uuid("id must be a uuid"),
    email: z.email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),

});

export const userPaginationSchema = z.object({
    page: z.coerce.number("page must be a number"),
    limit: z.coerce.number("limit must be a number")
});

export type IdUserAttribute = z.infer<typeof idUserSchema>;
export type UserPaginationAttribute = z.infer<typeof userPaginationSchema>;
