import { Router } from "express";
import * as authController from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router: Router = Router();

//router.post("/register", authController.register);
//router.post("/login", authController.login);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe); // ← route protégée

export default router;