import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler";
import * as WalletController from "../controllers/wallet";

const router = Router();

router.post("/", asyncHandler(WalletController.createWallet));
router.get("/", asyncHandler(WalletController.getWallets));
router.delete("/:id", asyncHandler(WalletController.deleteWallet));

export default router;
