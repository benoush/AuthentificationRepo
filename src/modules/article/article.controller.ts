import { ArticleService } from "./article.service";
import { Request, Response } from "express";
import { sendPaginated, sendSuccess } from "../../common/api.response"
import { CreateArticleAttribute } from "./article.schema";

export class ArticleController {
    private articleService: ArticleService;

    constructor() {
        this.articleService = new ArticleService();
    }

    createArticle = async (req: Request, res: Response) => {
        const objectArticle = req.body;
        const data = await this.articleService.createArticle(objectArticle);
        return sendSuccess(
            res,
            objectArticle,
            "Operation succesfull"
        )
    }

    getArticleById = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const data = await this.articleService.getArticleById(id);
        return sendSuccess(
            res,
            data,
            "Operation successful",
            201
        );
    }

    getArticlePaginated = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.articleService.getArticlePaginated(page, limit);
        return res.send(
            {
                page,
                limit,
                data
            }
        );
    }

    updateArticle = async (req:Request,res:Response) => {
        const id = req.params.id as string;
        const data = req.body as Partial<CreateArticleAttribute>;
        return res.send({
            data: await this.articleService.updtateArticle(id, data),
        })
    }

    deleteArticle = async (req:Request,res:Response) => {
    const id = req.params.id as string;
    return res.send({
      data: await this.articleService.deleteArticle(id),
    });
    }

}