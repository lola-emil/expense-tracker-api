import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as userController from "../controllers/user";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.get("/", authGuard, asyncHander(userController.getUsers));
router.post("/register", authGuard, asyncHander(userController.register));
router.get("/search",authGuard, asyncHander(userController.searchUsers) )
export default router;