import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.get("/", asyncHander(ExpenseController.getExpenses));
router.post("/", asyncHander(ExpenseController.addExpense));
router.patch("/:userId", asyncHander(ExpenseController.updateExpense));

export default router;