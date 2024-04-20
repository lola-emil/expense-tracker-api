import { Request, Response } from "express";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import * as TransactionRepo from "../../dal/transaction";
import { transactionValidator } from "../../utils/validator";


export async function getTransactions(req: Request, res: Response) {
    const userId = res.locals.userId;
    const apiResponse = new ApiResponse();

    const transactions = await TransactionRepo.getTransactions(userId);

    apiResponse.data = transactions;

    return handleResponse(apiResponse, res);
}

export async function createTransaction(req: Request, res: Response) {
    const body: TransactionRepo.Transaction = req.body;

    body.user_id = res.locals.userId;

    const error = transactionValidator(body);
    const apiResponse = new ApiResponse();

    if (error)
        throw new ErrorResponse(400, error);

    await TransactionRepo.insert(body);

    apiResponse.status = 200;
    apiResponse.message = "Created successfully";

    return handleResponse(apiResponse, res);
}

export async function deleteTransaction(req: Request, res: Response) {
    const transId = req.params.id;
    const apiResponse = new ApiResponse();

    const result = await TransactionRepo.deleteTransaction(transId);

    console.log("From delete transaction:", result);

    apiResponse.status = 200;
    apiResponse.message = "Deleted successfully";

    return handleResponse(apiResponse, res);
}