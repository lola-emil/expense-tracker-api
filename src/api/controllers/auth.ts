import { Request, Response } from "express";
import * as userDal from "../../dal/user";
import { validateLogin, validateRegister } from "../../util/validation";
import { signToken } from "../../util/jwt-util";

export async function login(req: Request, res: Response) {
    const user = req.body;
    const error = await validateLogin(user);

    if (error) return res.status(400).json({
        message: error
    });

    const matchedUser = await userDal.findbyUsername(user.username);
    const token = await signToken({ user_id: matchedUser?.user_id }, "secret");

    return res.status(200).json({
        message: "Logged In",
        data: {
            user_id: matchedUser?.user_id,
            token
        }
    });
}

export async function register(req: Request, res: Response) {
    const user = req.body;
    const error = await validateRegister(user);

    if (error) return res.status(400).json({
        message: error
    });
    
    await userDal.insert(user);
    
    return res.status(201).json({
        message: "Registered",
    });
}