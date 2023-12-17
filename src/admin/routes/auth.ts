import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as authController from "../controllers/auth";

const router = Router();

router.post("/login", asyncHander(authController.adminLogin));

router.post("/register", (req, res) => {
    res.json({
        message: "admin login"
    });
});

export default router;