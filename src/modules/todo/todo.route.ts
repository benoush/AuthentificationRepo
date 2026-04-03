import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { TodoController } from "./todo.controller";
import { todoPaginationSchema, createTodoSchema, idTodoSchema } from "./todo.schema";

const router: Router = Router();

const todoController = new TodoController();

router.get('', validate(todoPaginationSchema, "query"), todoController.getTodoPaginated);

router.post('', validate(createTodoSchema, "body"), todoController.createTodo);

router.patch('/:id', validate({
    params: idTodoSchema,
    body: createTodoSchema
}), todoController.updateTodo);

router.get('/:id', validate(idTodoSchema, "params"),todoController.getTodoById);

router.delete('/:id', validate(idTodoSchema, "params"),todoController.deleteTodo);

router.patch('/:id/toggle', validate({ params: idTodoSchema }), todoController.toggleComplete);

export default router;