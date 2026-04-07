import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { UserController } from "./userController";
//import { articlePaginationSchema, createArticleSchema, idArticleSchema } from "./article.schema";

const router: Router = Router();

const userController = new UserController();

router.get('', userController.getUserPaginated);

router.get('/id/:id',userController.getUserById);

router.get('/email/:email',userController.getUserByEmail);

router.delete('/:id',userController.deleteUser)

export default router;