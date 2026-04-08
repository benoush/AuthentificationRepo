import { User } from "../../database/models/auth";
import { Photo } from "../../database/models/photo";

import {  ModelStatic  } from "sequelize";
import { NotFoundError } from "../../common/errors/index";

export class PhotoRepository {
    private photo: ModelStatic<Photo>
    private user: ModelStatic<User>

    constructor(){
        this.photo = Photo;
        this.user = User;
    }


    async updateAvatar(userId: string, url:string){
        const user = await this.user.findByPk(userId);
        if (!user) return null;
        await user.update ({avatar:url});
        return user;
    }

    async addPhoto(userId:string, url:string){
        return this.photo.create({userId,url})
    }

    async getGallery(userId: string, page:number,limit:number){
        const offset = (page-1) * limit;
        return this.photo.findAndCountAll({
            where:{userId},
            order:[["createdAt", "DESC"]],
            limit,
            offset
        })
    }

   
}
