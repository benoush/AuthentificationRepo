import { Model, ModelStatic } from "sequelize";
import { Article, ArticleCreationAttributes } from "../../database/models/article";
import { NotFoundError } from "../../common/errors/index";

export class ArticleRepository {
    private article: ModelStatic<Article>

    constructor(){
        this.article = Article;
    }

    async createArticle(data: ArticleCreationAttributes){
        return this.article.create(data);
    }

    async getArticleById(id: string){
        return this.article.findByPk(id);
    }

    async getArticlePaginated(page: number, limit: number) {
        const offset = (page - 1) * limit;
        return this.article.findAndCountAll({ offset, limit, });
    }

    async updateArticle(id: string, data: Partial<ArticleCreationAttributes>){
        const article = await this.getArticleById(id);
        if(!article){
            return null;
        }
        await article.update(data, {
            where: {
                id: data.id
            }
        });
        return article;
    }

    async deleteArticle(id: string){
        const article = await this.getArticleById(id);
        if (!article)
            throw new NotFoundError("Article");

        await article.destroy();
        return true;
    }
}
