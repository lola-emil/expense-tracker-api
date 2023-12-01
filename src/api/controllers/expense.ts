import { Request, Response } from "express";
import * as expenseDal from "../../dal/expense";
import { validateExpense } from "../../util/validation-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../util/response-util";


export async function addExpense(req: Request, res: Response) {
    const body = req.body;
    const error = validateExpense(body);
    const apiResponse = new ApiResponse();

    if (error) throw new ErrorResponse(400, error);

    const result = await expenseDal.insert(body);
    if (result == null) throw new ErrorResponse(500, "dili ma add");

    apiResponse.status = 200;
    apiResponse.data = { expense_id: result };
    apiResponse.message = "Ok";

    return handleResponse(apiResponse, res);
}