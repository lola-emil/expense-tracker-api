import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

const TBL_NAME = "tbl_records";
export interface Record {
    record_id: string;
    note: string;
    category: string;
    amount: number;
    user_id: string;
    created_at: Date;
}

// Insert new record/transaction to database
export async function insert(expense: Record) {
    const expenseId = uuidv4();
    try {
        await db<Record>(TBL_NAME).insert(expense);
        return expenseId;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Get all records/transactions by user_id
export async function findAllByUserId(userId: string, month?: number, year?: number) {
    try {
        const result = await db<Record>(TBL_NAME)
            .select()
            .whereRaw("DATE_FORMAT(created_at, '%Y-%m') = ? AND user_id = ?",
                [
                    `${year}-${month?.toString().padStart(2, "0")}`,
                    userId
                ])
            .orderBy("created_at", "desc");

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Update record/transaction by id
export async function updateById(id: string, data: Record) {
    try {
        await db<Record>(TBL_NAME).update(data).where("record_id", id);
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Get overview of records/transactions
export async function getOverview(userId: string) {
    try {
        let rows = await db<Record>(TBL_NAME)
            .column("category")
            .sum({ total_expense: "amount" })
            .groupBy("category")
            .where("user_id", userId);

        let totalSum = rows.reduce((sum, row) =>
            sum + row.total_expense, 0);

        let result = rows.map(row => ({
            category: row.category,
            total_expense: row.total_expense,
            percentage: parseFloat(((row.total_expense / totalSum) * 100).toFixed(2))
        }));

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

// Get the 5 latest added records/transactions from database
export async function getRecentRecords(userId: string) {
    try {
        let rows = await db<Record>(TBL_NAME)
            .select()
            .where("user_id", userId)
            .orderBy("created_at", "desc").limit(5);

        return rows;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function getTotalExpenseById(userId: string) {
    try {
        const result = await db<Record>(TBL_NAME)
            .column("amount")
            .sum({ total_expense: "amount" })
            .where("user_id", userId);

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function searchByDescriptionOrCategory(userId: string, query: string) {
    try {
        const result = await db<Record>(TBL_NAME)
            .select()
            .where("user_id", userId)
            .andWhere(function () {
                this.whereILike("note", `%${query}%`)
                    .orWhereILike("category", `%${query}%`);
            });

        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}

export async function deleteById(id: string) {
    try {
        const result = await db<Record>(TBL_NAME).delete().where("record_id", id);
        return result;
    } catch (error) {
        throw new Error((<any>error).code);
    }
}