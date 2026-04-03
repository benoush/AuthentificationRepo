import { TodoService } from "./todo.service";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { CreateTodoAttribute } from "./todo.schema";




export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    createTodo = async (req: Request, res: Response) => {
        const objectTodo = req.body;
        const data = await this.todoService.createTodo(objectTodo);
        return sendSuccess(
            res,
            data,
            "Operation succesfull"
        )
    }

    getTodoById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.todoService.getTodoById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getTodoPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const title = req.query.title as string;
        const date = req.query.date as string;
        const data = await this.todoService.getTodoPaginated(page, limit,{
            title,
            date
        });
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateTodo = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as CreateTodoAttribute;
        return res.send({
            data: await this.todoService.updateTodo(id, data),
        })
    }

    deleteTodo = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.todoService.deleteTodo(id),
    });
    }

    toggleComplete = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        return res.send({
            data: await this.todoService.toggleComplete(id),
        });
    }

}