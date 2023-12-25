import { Request, Response } from "express";
import * as expenseRepo from "../../dal/expense";
import { validateExpense } from "../../utils/validation-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";


export async function addExpense(req: Request, res: Response) {
    const body = req.body;
    const error = validateExpense(body);
    const apiResponse = new ApiResponse();

    if (error) throw new ErrorResponse(400, error);

    const result = await expenseRepo.insert(body);
    if (result == null) throw new ErrorResponse(500, "Insertion error");

    apiResponse.status = 200;
    apiResponse.data = { expense_id: result };

    return handleResponse(apiResponse, res);
}

export async function getExpenses(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = String(req.query.userId);


    const currentDate = new Date();

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const expenses = await expenseRepo.findAllByUserId(userId, month, year);

    apiResponse.status = 200;
    apiResponse.data = expenses;

    return handleResponse(apiResponse, res);
}

export async function updateExpense(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = req.params.userId;
    const body = req.body;

    await expenseRepo.updateById(userId, body);

    apiResponse.status = 200;
    apiResponse.message = "Update successful";

    return handleResponse(apiResponse, res);
}

export async function deleteRecord(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const recordId = req.params.recordId;

    await expenseRepo.deleteById(recordId);

    apiResponse.status = 200;
    apiResponse.message = "Record Deleted";

    return handleResponse(apiResponse, res);
}


export async function getOverview(req: Request, res: Response) {
    const userId = String(req.query.userId);

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await expenseRepo.getOverview(userId);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function getRecent(req: Request, res: Response) {
    const userId = String(req.query.userId);

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await expenseRepo.getRecentRecords(userId);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function searchTransaction(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = req.query.userId;
    const query = req.query.q;

    const result = await expenseRepo.searchByDescriptionOrCategory(userId + "", query + "");

    apiResponse.status = 200;
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}