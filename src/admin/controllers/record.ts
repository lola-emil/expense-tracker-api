import { Request, Response } from "express";
import * as RecordRepo from "../../dal/record";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";



export async function getRecords(req: Request, res: Response) {
    const userId = req.query.user_id;
    const deleted = req.query.deleted;
    const apiResponse = new ApiResponse();

    if (!userId)
        throw new ErrorResponse(404, "user_id query required");

    const records = await RecordRepo.select(userId + "", {
        cols: ["record_id", "category", "note", "amount", "user_id", "created_at", "delete_time"],
        recordOpt: { deleted: deleted == 'true' ? true : false }
    });

    apiResponse.status = 200;
    apiResponse.data = records

    return handleResponse(apiResponse, res);
}

// Get single record by id
export async function getRecord(req: Request, res: Response) {
    const recordId = req.params.id;
    const apiResponse = new ApiResponse();

    const record = await RecordRepo.selectById(recordId);

    apiResponse.status = 200;
    apiResponse.data = record;

    return handleResponse(apiResponse, res);
}

export async function addRecord(req: Request, res: Response) {
    
}