import { Request, Response } from "express";
import * as expenseDal from "../../dal/expense";
import { validateExpense } from "../../utils/validation-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";


export async function addExpense(req: Request, res: Response) {
    const body = req.body;
    const error = validateExpense(body);
    const apiResponse = new ApiResponse();

    if (error) throw new ErrorResponse(400, error);

    const result = await expenseDal.insert(body);
    if (result == null) throw new ErrorResponse(500, "dili ma add");

    apiResponse.status = 200;
    apiResponse.data = { expense_id: result };

    return handleResponse(apiResponse, res);
}

export async function getExpenses(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = String(req.query.userId);

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const expenses = await expenseDal.findAllByUserId(userId);

    apiResponse.status = 200;
    apiResponse.data = expenses;

    return handleResponse(apiResponse, res);
}

export async function updateExpense(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = req.params.userId;
    const body = req.body;

    await expenseDal.updateById(userId, body);

    apiResponse.status = 200;
    apiResponse.message = "Update successful";

    return handleResponse(apiResponse, res);
}


export async function getOverview(req: Request, res: Response) {
    const userId = String(req.query.userId);

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await expenseDal.getOverview(userId);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function getRecent(req: Request, res: Response) {
    const userId = String(req.query.userId);

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await expenseDal.getRecentRecords(userId);


    console.log(data);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}