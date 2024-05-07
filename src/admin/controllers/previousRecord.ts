import { Request, Response } from "express";
import * as PrevRecordRepo from "../../dal/previousRecord";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";



export async function getPreviousRecords(req: Request, res: Response) {
    const recordId = req.query.record_id;
    const apiResponse = new ApiResponse();

    if (!recordId)
        throw new ErrorResponse(404, 'record_id query required');

    const record = await PrevRecordRepo.select({
        recordOpt: { record_id: recordId + "" }
    });

    apiResponse.status = 200;
    apiResponse.data = record;

    return handleResponse(apiResponse, res);
}

export async function getPreviousRecord(req: Request, res: Response) {
    
}