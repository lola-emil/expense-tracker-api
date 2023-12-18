import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as AuthController from "../controllers/auth";

const router = Router();

// router.post("/register", asyncHander(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));

export default router;