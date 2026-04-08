import { PhotoRepository } from "./photoRepository";
import { NotFoundError } from "../../common/errors";
import { promise } from "zod";

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

    async addToGallery(userId:string, files:Express.Multer.File[]){
        const urls = files.map(f => f.path.replace(/\\/g, "/"));
        const photos = await Promise.all(
            urls.map(url => this.repository.addPhoto(userId, url))
        )
        return photos;
    }

    async getGallery(userId:string, page:number, limit:number){
        return this.repository.getGallery(userId, page, limit);
    }
}