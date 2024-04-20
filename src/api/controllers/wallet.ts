import { Request, Response } from "express";
import { Wallet } from "../../dal/wallet";
import * as WalletRepo from "../../dal/wallet";
import { walletValidator } from "../../utils/validator";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";


export async function createWallet(req: Request, res: Response) {
    const body: Wallet = req.body;
    const apiResponse = new ApiResponse();

    body.user_id = res.locals.userId;
    const error = walletValidator(body);

    if (error)
        throw new ErrorResponse(400, error);

    await WalletRepo.insert(body);

    apiResponse.status = 200;
    apiResponse.message = "Created successfully";

    return handleResponse(apiResponse, res);
}

export async function getWallets(req: Request, res: Response) {
    const userId = res.locals.userId;
    const apiResponse = new ApiResponse();

    const wallets = await WalletRepo.getWallets(userId);

    apiResponse.data = wallets;
    return handleResponse(apiResponse, res);
}

export async function deleteWallet(req: Request, res: Response) {
    const walletId = req.params.id;
    const apiResponse = new ApiResponse();

    await WalletRepo.deleteWallet(walletId);


    apiResponse.status = 200;
    apiResponse.message = "Deleted successfully";

    return handleResponse(apiResponse, res);
}