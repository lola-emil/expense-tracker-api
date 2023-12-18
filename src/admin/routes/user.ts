import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as userController from "../controllers/user";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.get("/", authGuard, asyncHandler(userController.getUsers));
router.post("/register", authGuard, asyncHandler(userController.register));
router.get("/search",authGuard, asyncHandler(userController.searchUsers) )
export default router;