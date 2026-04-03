import { Model, ModelStatic, where } from "sequelize";
import { Todo, TodoAttributes, TodoCreationAttributes } from "../../database/models/todo";
import { NotFoundError } from "../../common/errors/index";
import { Op, WhereOptions } from "sequelize";
import da from "zod/v4/locales/da.js";


export interface TodoFilters {
  title?: string;
  date?: string; 
}


export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
export class TodoRepository {
    private todo: ModelStatic<Todo>

    constructor(){
        this.todo = Todo;
    }

    async createTodo(data: TodoCreationAttributes){
        return this.todo.create(data);
    }

    async getTodoById(id: string){
        return this.todo.findByPk(id);
    }

    async getTodoPaginated(
    page: number,
    limit: number,
    filters: TodoFilters
  ): Promise<PaginatedResult<Todo>> {
    const offset = (page - 1) * limit;

    const where: WhereOptions<TodoAttributes> = {};

    if (filters.title) {
      where.title = {
        [Op.iLike]: `%${filters.title}%`,
      };
    }

    if (filters.date) {
      const start = new Date(filters.date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(filters.date);
      end.setHours(23, 59, 59, 999);

      where.createdAt = {
        [Op.between]: [start, end],
      };
    }

    const { count, rows } = await this.todo.findAndCountAll({
      where,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

    async updateTodo(todoId: string, data: Partial<TodoCreationAttributes>) {
    const todo = await this.todo.update(data, {
        where: { id: todoId }
    });

    if (!todo) {
        return null;
    }

    return await this.getTodoById(todoId); 
}

    async deleteTodo(id: string) {
    const deleted = await this.todo.destroy({
        where: { id }
    });

    return deleted;
}

    async toggleComplete(id: string) {
  const todo = await this.getTodoById(id);
  if (!todo) return null;

  const newStatus = !todo.completed; 

  await todo.update({
    completed: newStatus,
    completedAt: newStatus ? new Date() : null, 
    
  });

  return todo;
}
}
