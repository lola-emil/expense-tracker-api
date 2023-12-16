import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
    res.json({
        message: "admin login"
    });
});

router.post("/register", (req, res) => {
    res.json({
        message: "admin login"
    });
});

export default router;