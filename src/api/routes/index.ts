import { Router } from "express";
import authRoute from "./auth";
import expenseRoute from "./expense";
import authGuard from "../../middlewares/authGuard";
import { ErrorResponse } from "../../utils/response-util";

const router = Router();

router.use("/auth", authRoute);
router.use("/expense", authGuard, expenseRoute);



export default router;