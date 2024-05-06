import Joi from "joi";
import { User } from "../dal/user";
import * as userRepo from "../dal/user";
import * as adminRepo from "../dal/admin";
import { Expense } from "../dal/expense";

import bcrypt from "bcrypt";
import { Admin } from "../dal/admin";
import { Record } from "../dal/record";


const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const registerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    position: Joi.string().required(),
    password: Joi.string().alphanum().min(8).required()
});

const recordSchema = Joi.object({
    category: Joi.string().max(50).required(),
    note: Joi.string().max(50).required(),
    amount: Joi.number().required(),
    user_id: Joi.string().required()
});

export async function validateLogin(user: User): Promise<string | null> {
    const { error } = loginSchema.validate(user);

    if (error) return error.message;

    const matchedUser = await userRepo.findByEmail(user.email);
    if (!matchedUser) return "Invalid username or password";
    
    if (!(await bcrypt.compare(user.password, matchedUser.password)))
        return "Invalid username or password";

    return null;
}

export async function validateRegister(user: User): Promise<string | null> {
    const { error } = registerSchema.validate(user);

    if (error) return error.message;

    const matchedUser = await userRepo.findByEmail(user.username);
    if (matchedUser) return "Email already taken";

    return null;
}

export function validateExpense(expense: Expense) {
    const { error } = recordSchema.validate(expense);

    if (error) return error.message;

    return null;
}

export function validateRecord(record: Record) {
    const {error}  = recordSchema.validate(record);

    if (error) return error.message;

    return null;
}


export async function validateAdminLogin(admin: Admin) {
    const { error } = loginSchema.validate(admin);

    if (error) return error.message;

    const matchedUser = await adminRepo.findByUsername(admin.username); 
    if (!matchedUser) return "Invalid username or password";

    if (!(await bcrypt.compare(admin.password, matchedUser.password)))
    return "Invalid username or password";

    return null;
}