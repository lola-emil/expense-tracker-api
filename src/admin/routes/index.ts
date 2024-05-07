import { Router } from "express";

import authRouter from "./auth";
import userRouter from "./user";
import recordRouter from "./record";
import previousRecordRoute from "./previousRecord";

const router = Router();

router.use("/", authRouter);
router.use("/users", userRouter);
router.use("/records", recordRouter);
router.use("/previous-records", previousRecordRoute);

export default router;