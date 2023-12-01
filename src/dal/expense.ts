import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

const TBL_NAME = "tbl_expenses";
export interface Expense {
    expense_id: string;
    description: string;
    category: string;
    amount: number;
    user_id: string;
    created_at: Date;
}

export async function insert(expense: Expense) {
    const expenseId = uuidv4();
    try {
        await db<Expense>(TBL_NAME).insert(expense);
        return expenseId;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}
