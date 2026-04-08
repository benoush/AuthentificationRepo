import { Response } from "express";
import  { PhotoService } from "./photoService";
import { AuthRequest } from "../middleware/auth.middleware";
import { sendPaginated, sendSuccess } from "../../common/api.response"


export class PhotoController{
    private photoService: PhotoService;

    constructor(){
        this.photoService = new PhotoService;
    }

    uploadAvatar = async (req:AuthRequest, res: Response) =>{
        const file = req.file;
        const data = await this.photoService.uploadAvatar(req.user!.userId, file!.path);
        return sendSuccess(res, data,"Photo de profil mis à jour");
    };

    addGalleryPhoto = async (req:AuthRequest, res: Response) =>{
        const file = req.file;
        const data = await this.photoService.addToGallery(req.user!.userId, file!.path);
        return sendSuccess(res, data,"Photo ajoutée à la gallery", 201);
    }

    getGallery = async (req:AuthRequest, res: Response) =>{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const data = await this.photoService.getGallery(req.user!.userId, page, limit);
        return sendPaginated(res, data.rows,data.count, page, limit)
    }
}