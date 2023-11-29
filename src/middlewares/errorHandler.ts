import { NextFunction, Request, Response } from "express";
import { ApiResponse, ErrorResponse, handleResponse } from "../util/response-util";

export default function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction) {
    const errorResponse = error as ErrorResponse;
    const apiResponse = new ApiResponse();

    if (error instanceof ErrorResponse) {
        apiResponse.status = errorResponse.status;
        apiResponse.message = errorResponse.message;
    } else {
        apiResponse.status = 500;
        apiResponse.message = error.message;
    }

    return handleResponse(apiResponse, res);
}