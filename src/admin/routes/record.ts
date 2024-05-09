import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as RecordController from "../controllers/record";

const router = Router();

router.get("/", asyncHandler(RecordController.getRecords));
router.get("/:id", asyncHandler(RecordController.getRecord));
router.post("/");
router.patch("/:id");
router.delete("/:id");

export default router;