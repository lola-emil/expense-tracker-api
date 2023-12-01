import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../util/response-util";
import { verifyToken } from "../util/jwt-util";

export default async function authGuard(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");

    if (!token) return next(new ErrorResponse(401, "Unauthorized: No token provided"));

    try {
        await verifyToken(token.split(" ")[1], "secret");
        return next();
    } catch (error) {
        return next(new ErrorResponse(401, "Unauthorized: Invalid token"));
    }
}