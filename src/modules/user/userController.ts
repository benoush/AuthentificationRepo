import { UserService } from "./userService";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
//import { CreateArticleAttribute } from "./user.schema";
import { z } from "zod";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUserById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const uuidSchema = z.string().uuid();
        if (!uuidSchema.safeParse(id).success) {
            return null; 
        }
        const data = await this.userService.getUserById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getUserByEmail = async (req: Request, res: Response) => {
        const email = req.params.email as string;
        const emailSchema = z.string().email();
        if (!emailSchema.safeParse(email).success) {
            return null;
        }

        const data = await this.userService.getUserByEmail(email);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getUserPaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.userService.getUserPaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    deleteUser = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.userService.deleteUser(id),
    });
}
}
