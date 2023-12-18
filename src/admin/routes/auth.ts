import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as authController from "../controllers/auth";

const router = Router();

router.post("/login", asyncHandler(authController.adminLogin));

router.post("/register", (req, res) => {
    res.json({
        message: "admin login"
    });
});

export default router;