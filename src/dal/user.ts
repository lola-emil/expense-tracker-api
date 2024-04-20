import db from "../init/db";

const TBL_NAME = "tblusers";

export interface User {
    user_id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export async function findByEmail(email: string): Promise<User> {
    const result = await db<User>(TBL_NAME).select().where("email", email);
    return result[0];
}