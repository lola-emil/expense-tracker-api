import Joi from "joi";
import { User } from "../dal/user";
import * as userDal from "../dal/user";
import { Record } from "../dal/expense";

import bcrypt from "bcrypt";


const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().alphanum().min(8).required()
});

const recordSchema = Joi.object({
    note: Joi.string().max(50).required(),
    category: Joi.string().max(50).required(),
    amount: Joi.number().required(),
    user_id: Joi.string().required()
});

export async function validateLogin(user: User): Promise<string | null> {
    const { error } = loginSchema.validate(user);

    if (error) return error.message;

    const matchedUser = await userDal.findbyUsername(user.username);
    if (!matchedUser) return "Invalid username or password";
    
    if (!(await bcrypt.compare(user.password, matchedUser.password)))
        return "Invalid username or password";

    return null;
}

export async function validateRegister(user: User): Promise<string | null> {
    const { error } = registerSchema.validate(user);

    if (error) return error.message;

    const matchedUser = await userDal.findbyUsername(user.username);
    if (matchedUser) return "Username already taken";

    return null;
}

export function validateExpense(expense: Record) {
    const { error } = recordSchema.validate(expense);

    if (error) return error.message;

    return null;
}