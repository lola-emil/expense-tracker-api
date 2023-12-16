import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";

const router = Router();

router.get("/transactions", asyncHander(ExpenseController.getExpenses));
router.post("/transactions", asyncHander(ExpenseController.addExpense));
router.patch("/transactions/:userId", asyncHander(ExpenseController.updateExpense));

router.get("/overview", asyncHander(ExpenseController.getOverview));
router.get("/recent", asyncHander(ExpenseController.getRecent))
export default router;