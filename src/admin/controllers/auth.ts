import { Request, Response } from "express";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import { validateAdminLogin } from "../../utils/validation-util";
import * as adminRepo from "../../dal/admin";
import { signToken } from "../../utils/jwt-util";



export async function adminLogin(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const body = req.body;
    const error = await validateAdminLogin(body);

    if (error) throw new ErrorResponse(400, error);

    const matchedUser = await adminRepo.findByUsername(body.username);
    const token = await signToken({admin_id: matchedUser?.admin_id}, "secret-key");

    apiResponse.status = 200;
    apiResponse.message = "Login successful";

    apiResponse.data = {
        token
    }

    return handleResponse(apiResponse, res);
}