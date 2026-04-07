import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { UserController } from "./userController";
//import { articlePaginationSchema, createArticleSchema, idArticleSchema } from "./article.schema";

const router: Router = Router();

const userController = new UserController();

router.get('', userController.getUserPaginated);

router.get('/:id',userController.getUserById);

router.delete('/:id',userController.deleteUser);

router.get('/email/:email',userController.getUserByEmail);



export default router;