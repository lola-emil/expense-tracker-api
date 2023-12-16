import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

const TBL_NAME = "tbl_records";
export interface Record {
    record_id: string;
    note: string;
    category: string;
    amount: number;
    user_id: string;
    type: "income" | "expense";
    created_at: Date;
}

export async function insert(expense: Record) {
    const expenseId = uuidv4();
    try {
        await db<Record>(TBL_NAME).insert(expense);
        return expenseId;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function findAllByUserId(userId: string) {
    try {
        const result = await db<Record>(TBL_NAME).select().where("user_id", userId);
        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function updateById(id: string, data: Record) {
    try {
        await db<Record>(TBL_NAME).update(data).where("record_id", id);
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function getOverview(userId: string) {
    try {
        let rows = await db<Record>(TBL_NAME)
            .column("category")
            .sum({ total_sales: "amount" })
            .groupBy("category")
            .where("user_id", userId);

        let totalSum = rows.reduce((sum, row) =>
            sum + row.total_sales, 0);

        let result = rows.map(row => ({
            category: row.category,
            total_sales: row.total_sales,
            percentage: parseFloat(((row.total_sales / totalSum) * 100).toFixed(2))
        }));

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function getRecentRecords(userId: string) {
    try {
        let rows = await db<Record>(TBL_NAME)
            .column("record_id", "note", "category", "amount", "type", "created_at")
            .select()
            .where("user_id", userId)
            .orderBy("created_at", "desc").limit(5);

        return rows;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}