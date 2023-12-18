import { Request, Response } from "express";
import * as userRepo from "../../dal/user";
import * as expenseRepo from "../../dal/expense";
import { ApiResponse, ErrorResponse, handleResponse } from "../../utils/response-util";
import { validateRegister } from "../../utils/validation-util";

export async function getUsers(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const users = await userRepo.findAll();

    apiResponse.status = 200;
    apiResponse.data = users;

    return handleResponse(apiResponse, res);
}

export async function register(req: Request, res: Response) {
    const apiResponse = new ApiResponse();
    const user = req.body;
    const error = await validateRegister(user);

    if (error) throw new ErrorResponse(400, error);

    await userRepo.insert(user);

    apiResponse.status = 201;
    apiResponse.message = "Registration successful";

    return handleResponse(apiResponse, res);
}


export async function searchUsers(req: Request, res: Response) {
    const apiResponse = new ApiResponse();

    const q = req.query.q;

    console.log(q);

    const result = await userRepo.searchUserByName(String(q));

    apiResponse.status = 200;
    apiResponse.data = result;

    return handleResponse(apiResponse, res);
}