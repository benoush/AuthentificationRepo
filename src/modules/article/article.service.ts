
import { ArticleRepository } from "./article.repository";
import { CreateArticleAttribute } from "./article.schema";


export class ArticleService {
    private articleRepository: ArticleRepository;

    constructor(){
        this.articleRepository = new ArticleRepository();
    }
    async createArticle(articleRequest: CreateArticleAttribute){
        return await this.articleRepository.createArticle(articleRequest);
    }
    async getArticleById(id: string){
        return await this.articleRepository.getArticleById(id);
    }
    async getArticlePaginated(page: number, limit: number) {
        return await this.articleRepository.getArticlePaginated(page, limit);
    }
    async updtateArticle(id: string, updatdada: Partial<CreateArticleAttribute>){
        const data = await this.articleRepository.getArticleById(id);
        if(!data){
            return null;
        }
        return await this.articleRepository.updateArticle(id, updatdada);
    }
    async deleteArticle(id: string){
        return await this.articleRepository.deleteArticle(id);    
    }
}