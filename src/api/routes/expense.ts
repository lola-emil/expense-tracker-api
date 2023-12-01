import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.get("/", authGuard, asyncHander(ExpenseController.getExpenses));
router.post("/", authGuard, asyncHander(ExpenseController.addExpense));
router.patch("/:userId", authGuard, asyncHander(ExpenseController.updateExpense));

export default router;