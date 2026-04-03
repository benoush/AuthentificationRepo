
import { TodoRepository } from "./todo.repository";
import { CreateTodoAttribute } from "./todo.schema";

export class TodoService {
    private todoRepository: TodoRepository;

    constructor(){
        this.todoRepository = new TodoRepository();
    }
    async createTodo(todoRequest: CreateTodoAttribute){
        return await this.todoRepository.createTodo(todoRequest);
    }
    async getTodoById(id: string){
        return await this.todoRepository.getTodoById(id);
    }
    async getTodoPaginated(page: number, limit: number, filters: { title?: string; date?: string }) {
        return await this.todoRepository.getTodoPaginated(page, limit, filters);
    }
    async updateTodo(id: string, payload: CreateTodoAttribute) {
    const data = await this.todoRepository.getTodoById(id);

    if (!data) {
        return null;
    }

    return await this.todoRepository.updateTodo(id, payload);
}
    async deleteTodo(id: string){
        const data = await this.todoRepository.getTodoById(id);
        if(!data){
            return null;
        }
        return await this.todoRepository.deleteTodo(id);
    }

    async toggleComplete(id: string) {
        const todo = await this.getTodoById(id);
        if (!todo) return null;

        const previousStatus = todo.completed; 

        try {
            await todo.update({
                completed: !todo.completed,                    
                completedAt: !todo.completed ? new Date() : null,
            });

            return todo;
        } catch (error) {
            
            await todo.update({ completed: previousStatus });
            throw error;
        }
    }
}

