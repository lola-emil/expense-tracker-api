import db from "../init/db";


const TBL_NAME = "tbltransactions";

export interface Transaction {
    trans_id: string;
    user_id: string;
    amount: number;
    description: string;
    trans_type: string;
    category_id: string;
    
    event_date: string;
}


export async function insert(data: Transaction) {
    const result = await db<Transaction>(TBL_NAME).insert(data);
    return result;
}

export async function getTransactions(userId: string) {
    const result = await db<Transaction>(TBL_NAME).select().where("user_id", userId);   
    return result;
}

export async function deleteTransaction(id: string) {
    const result = await db<Transaction>(TBL_NAME).delete().where("trans_id", id);
    return result;
}