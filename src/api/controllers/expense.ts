import { Request, Response } from "express";
import * as recordRepo from "../../dal/record";
import { validateRecord } from "../../utils/validation-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";


export async function addRecord(req: Request, res: Response) {
    const body = req.body;
    const error = validateRecord(body);
    const apiResponse = new ApiResponse();

    if (error) throw new ErrorResponse(400, error);

    const result = await recordRepo.insert(body);
    if (result == null) throw new ErrorResponse(500, "Insertion error");

    apiResponse.status = 200;
    apiResponse.data = { expense_id: result };

    return handleResponse(apiResponse, res);
}

export async function getRecords(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = res.locals.userId; 

    console.log(userId);

    // if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const expenses = await recordRepo.selectAll(userId);

    apiResponse.status = 200;
    apiResponse.data = expenses;

    return handleResponse(apiResponse, res);
}

// export async function updateExpense(req: Request, res: Response) {
//     const apiResponse = new ApiResponse();
//     const userId = req.params.userId;
//     const body = req.body;

//     await expenseRepo.updateById(userId, body);

//     apiResponse.status = 200;
//     apiResponse.message = "Update successful";

//     return handleResponse(apiResponse, res);
// }

export async function deleteRecord(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const recordId = req.params.recordId;

    await recordRepo.deleteById(recordId);

    apiResponse.status = 200;
    apiResponse.message = "Record Deleted";

    return handleResponse(apiResponse, res);
}


export async function getOverview(req: Request, res: Response) {
    const userId = res.locals.userId;

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await recordRepo.getOverview(userId);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function getRecent(req: Request, res: Response) {
    const userId = res.locals.userId;

    if (!userId) throw new ErrorResponse(404, "'userId' query required");

    const apiResponse = new ApiResponse();
    const data = await recordRepo.getRecentRecords(userId);

    apiResponse.data = data;
    apiResponse.status = 200;

    return handleResponse(apiResponse, res);
}

export async function searchTransaction(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const userId = req.query.userId;
    const query = req.query.q;

    const result = await recordRepo.searchByDescriptionOrCategory(userId + "", query + "");

    apiResponse.status = 200;
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}