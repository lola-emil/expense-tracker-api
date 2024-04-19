import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as TransactionController from "../controllers/transaction";

const router = Router();

router.post("/", asyncHandler(TransactionController.createTransaction));
router.get("/", asyncHandler(TransactionController.getTransactions));
router.delete("/:id", asyncHandler(TransactionController.deleteTransaction));

export default router;