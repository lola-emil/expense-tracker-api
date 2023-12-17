import { Request, Response } from "express";
import * as userRepo from "../../dal/user";
import { validateLogin, validateRegister } from "../../utils/validation-util";
import { signToken } from "../../utils/jwt-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";

export async function login(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const user = req.body;
    const error = await validateLogin(user);

    if (error) throw new ErrorResponse(400, error);

    const matchedUser = await userRepo.findbyUsername(user.username);
    const token = await signToken({ user_id: matchedUser?.user_id }, "secret-key");

    apiResponse.status = 200;
    apiResponse.message = "Login successful";
    apiResponse.data = {
        user_id: matchedUser?.user_id,
        name: matchedUser?.firstname + " " + matchedUser?.lastname,
        token
    };

    return handleResponse(apiResponse, res);
}

