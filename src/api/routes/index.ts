import { Router } from "express";
import authRoute from "./auth";
import expenseRoute from "./expense";
import authGuard from "../../middlewares/authGuard";
import recordRoute from "./record";

import { ErrorResponse } from "../../utils/response-util";

const router = Router();

router.use("/auth", authRoute);
router.use("/expense", authGuard, expenseRoute);

router.use("/records", authGuard, recordRoute);

export default router;