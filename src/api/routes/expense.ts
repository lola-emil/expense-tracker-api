import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.get("/", authGuard);
router.post("/", authGuard, asyncHander(ExpenseController.addExpense));

export default router;