import Joi from "joi";
import { User } from "../dal/user";
import * as userDal from "../dal/user";
import { comparePassword } from "./password-util";
import { Expense } from "../dal/expense";


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

const expenseSchema = Joi.object({
    description: Joi.string().max(50).required(),
    category: Joi.string().max(50).required(),
    amount: Joi.number().required(),
    user_id: Joi.string().required()
});

export async function validateLogin(user: User): Promise<string | null> {
    const { error } = loginSchema.validate(user);

    if (error) return error.message;

    const matchedUser = await userDal.findbyUsername(user.username);
    if (!matchedUser) return "Invalid username or password";
    if (!(await comparePassword(user.password, matchedUser.password)))
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

export function validateExpense(expense: Expense) {
    const { error } = expenseSchema.validate(expense);

    if (error) return error.message;

    return null;
}