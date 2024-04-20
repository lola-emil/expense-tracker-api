import { Request, Response } from "express";
import { loginValidator } from "../../utils/validator";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import { signToken } from "../../utils/jwt-util";
import * as UserRepo from "../../dal/user";

export async function login(req: Request, res: Response) {
    const body: UserRepo.User = req.body;
    const apiResponse = new ApiResponse();

    const error = await loginValidator(body);

    if (error)
        throw new ErrorResponse(401, error);

    const matchedUser = await UserRepo.findByEmail(body.email);
    
    const token = await signToken({
        user_id: matchedUser.user_id
    }, "secret");

    apiResponse.status = 200;
    apiResponse.message = "Login successful";
    apiResponse.data = {
        token
    }

    return handleResponse(apiResponse, res);
}