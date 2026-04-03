import z from "zod"

const createArticleSchema = z.object({
    titre: z.string("titre must be a string"),
    prix: z.number("prix must be a number"),
    quantite: z.number("qte must be a number")
});

const idArticleSchema = z.object({
    id: z.string().uuid("id must be a uuid")
});

const articlePaginationSchema = z.object({
    page: z.coerce.number("page must be a number"),
    limit: z.coerce.number("limit must be a number")
});

type CreateArticleAttribute = z.infer<typeof createArticleSchema>;
type IdArticleAttribute = z.infer<typeof idArticleSchema>;
type ArticlePaginationAttribute = z.infer<typeof articlePaginationSchema>;

export{
    CreateArticleAttribute,
    IdArticleAttribute,
    ArticlePaginationAttribute,
    createArticleSchema,
    idArticleSchema,articlePaginationSchema
}