import { Router } from "express";
import authRoute from "./auth";
import expenseRoute from "./expense";

const router = Router();

router.use("/auth", authRoute);
router.use("/expense", expenseRoute);

export default router;