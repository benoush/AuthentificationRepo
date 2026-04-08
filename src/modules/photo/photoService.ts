import { PhotoRepository } from "./photoRepository";
import { NotFoundError } from "../../common/errors";

export class PhotoService {
    private repository: PhotoRepository

    constructor(){
        this.repository = new PhotoRepository();
    }

    async uploadAvatar (userId:string, filePath: string){
        const url =filePath.replace(/\\/g, "/");
        const user = await this.repository.updateAvatar(userId,url);
        if (!user) throw new NotFoundError ("User");
        return user
    }

    async addToGallery(userId:string, filePath:string){
        const url = filePath.replace(/\\/g, "/");
        return this.repository.addPhoto(userId,url);
    }

    async getGallery(userId:string, page:number, limit:number){
        return this.repository.getGallery(userId, page, limit);
    }
}