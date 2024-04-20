import { Router } from "express";

import transactionRoute from "./transaction";
import authRoute from "./auth";
import walletRoute from "./wallet";
import authGuard from "../../middlewares/authGuard";

const router = Router();

router.use("/auth", authRoute);
router.use("/transaction", authGuard, transactionRoute);
router.use("/wallet", authGuard, walletRoute);

export default router;