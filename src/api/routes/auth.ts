import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as AuthController from "../controllers/auth";

const router = Router();

// router.post("/register", asyncHander(AuthController.register));
router.post("/login", asyncHander(AuthController.login));

export default router;