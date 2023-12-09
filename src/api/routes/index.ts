import { Router } from "express";
import authRoute from "./auth";
import expenseRoute from "./expense";
import authGuard from "../../middlewares/authGuard";
import { ErrorResponse } from "../../utils/response-util";

const router = Router();

router.use("/auth", authRoute);
router.use("/expense", authGuard, expenseRoute);

router.use("*", (req, res) => {
    throw new ErrorResponse(404, `Can't ${req.method} ${req.originalUrl}`);
});

export default router;