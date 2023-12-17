import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";

const router = Router();

router.use("/", authRouter);
router.use("/users", userRouter);

export default router;