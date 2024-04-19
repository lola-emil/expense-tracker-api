import { Router } from "express";

import transactionRoute from "./transaction";
import authRoute from "./auth";
import walletRoute from "./wallet";

const router = Router();

router.use("/auth", authRoute);
router.use("/transaction", transactionRoute);
router.use("/wallet", walletRoute);

export default router;