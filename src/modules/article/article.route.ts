import validate from "../middleware/validate.middleware";
import { Router } from "express";
import { ArticleController } from "./article.controller";
import { articlePaginationSchema, createArticleSchema, idArticleSchema } from "./article.schema";

const router: Router = Router();

const articleController = new ArticleController();

router.get('', validate(articlePaginationSchema, "query"), articleController.getArticlePaginated);

router.post('', validate(createArticleSchema, "body"), articleController.createArticle);

router.patch('/:id', validate({
    params: idArticleSchema,
    body: createArticleSchema
}), articleController.updateArticle);

router.get('/:id', validate(idArticleSchema, "params"),articleController.getArticleById);

router.delete('/:id', validate(idArticleSchema, "params"),articleController.deleteArticle)

export default router;