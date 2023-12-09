import { Router } from "express";
import asyncHander from "../../middlewares/asyncHandler";
import * as ExpenseController from "../controllers/expense";

const router = Router();

router.get("/records", asyncHander(ExpenseController.getExpenses));
router.post("/records", asyncHander(ExpenseController.addExpense));
router.patch("records/:userId", asyncHander(ExpenseController.updateExpense));

router.get("/overview", asyncHander(ExpenseController.getOverview));
router.get("/recent", asyncHander(ExpenseController.getRecent))
export default router;