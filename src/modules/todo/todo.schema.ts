import z, { date } from "zod"

const createTodoSchema = z.object({
    title: z.string("titre must be a string"),
    description: z.string()
});

const idTodoSchema = z.object({
    id: z.string().uuid("id must be a uuid")
});

const todoPaginationSchema = z.object({
    page: z.string("page must be a number").transform((v)=>{Number(v)}),
    limit: z.string("limit must be a number").transform((v)=>{Number(v)}),
    title: z.coerce.string().optional(),
    date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).transform((v) => { return new Date(v) }).optional(),
});
const updateTodoSchema = z.object({
    //title: z.string().optional(),
   // description: z.string().optional(),
    completed: z.boolean().optional()
});

type CreateTodoAttribute = z.infer<typeof createTodoSchema>;
type IdTodoAttribute = z.infer<typeof idTodoSchema>;
type TodoPaginationAttribute = z.infer<typeof todoPaginationSchema>;
type UpdateTodoAttribute = z.infer<typeof updateTodoSchema>;

export{
    CreateTodoAttribute,
    IdTodoAttribute,
    TodoPaginationAttribute,
    UpdateTodoAttribute,
    createTodoSchema,
    idTodoSchema,
    todoPaginationSchema,
    updateTodoSchema
}