import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/response-util";
import { verifyToken } from "../utils/jwt-util";

export default async function authGuard(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization");

        console.log(token);
        if (!token)
            return next(new ErrorResponse(401, "Unauthorized: No token provided"));
        if (token.split(" ")[0] !== "Bearer")
            return next(new ErrorResponse(401, "Unauthorized: Invalid token"));

        await verifyToken(token.split(" ")[1], "secret-key");
        return next();
    } catch (error) {
        return next(new ErrorResponse(401, "Unauthorized: Invalid token"));
    }
}