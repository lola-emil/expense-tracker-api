import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as PreviousRecordController from "../controllers/previousRecord";

const router = Router();

router.get("/", asyncHandler(PreviousRecordController.getPreviousRecords));
// router.get("/:id", asyncHandler(PreviousRecordController.getPreviousRecord));

export default router;