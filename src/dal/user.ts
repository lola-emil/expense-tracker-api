import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword } from "../util/password-util";

const TBL_NAME = "tbl_users";

export interface User {
    user_id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

export async function insert(user: User) {
    const userId = uuidv4();
    try {
        user.password = await encryptPassword(user.password);
        await db<User>(TBL_NAME).insert(user);
        return userId;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function findbyUsername(username: string) {
    try {
        const result = await db<User>(TBL_NAME).select().where("username", username);
        return result[0];
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function findById(id: string) {
    try {
        const result = await db<User>(TBL_NAME).select().where("user_id", id);
        return result[0];
    } catch (error) {
        throw new Error((<any>error).code);
    }
}