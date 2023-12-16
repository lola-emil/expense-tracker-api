import { Request, Response } from "express";
import * as userDal from "../../dal/user";
import { validateLogin, validateRegister } from "../../utils/validation-util";
import { signToken } from "../../utils/jwt-util";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";

export async function login(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const user = req.body;
    const error = await validateLogin(user);

    if (error) throw new ErrorResponse(400, error);

    const matchedUser = await userDal.findbyUsername(user.username);
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

export async function register(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const user = req.body;
    const error = await validateRegister(user);

    if (error) throw new ErrorResponse(400, error);

    await userDal.insert(user);

    apiResponse.status = 201;
    apiResponse.message = "Registration successful";
    
    return handleResponse(apiResponse, res);
}