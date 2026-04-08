import { Router } from "express";
import  {PhotoController} from "./photoController";
import { authMiddleware } from "../middleware/auth.middleware";
import{ uploadAvatar, uploadGallery } from "../../config/multer";

const router: Router = Router();
const photoController = new PhotoController();

router.use(authMiddleware);

router.post("/gallery", uploadGallery.array("photos",10), photoController.addGalleryPhoto);
router.get ("/gallery", photoController.getGallery);
router.patch("/profile/photo", uploadAvatar.single("avatar"), photoController.uploadAvatar);

export default router;