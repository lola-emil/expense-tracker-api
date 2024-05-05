import { db } from "../config/db";


const TBL_NAME = "tbl_admin";

export interface Admin {
    admin_id: string;
    username: string;
    password: string;
}

export async function findByUsername(username: string) {
    try {
        const result = await db<Admin>(TBL_NAME).select().where("username", username);
        return result[0];
    } catch (error) {
        throw new Error((<any>error).code);
    }
}