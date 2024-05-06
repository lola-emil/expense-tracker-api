import { db } from "../config/db";

const TBL_NAME = "tbl_records";
const cols = ['record_id', 'category', 'note', 'amount', 'user_id', 'created_at'];

export interface Record {
    record_id: string;
    category: string;
    note: string;
    amount: number;
    user_id: string;
    created_at: Date;
    delete_time: Date;
}

type URLQuery = {
    page?: number,
    per_page?: number,
    limit?: number,
    q?: string
};

export async function insert(data: Record) {
    const res = await db<Record>(TBL_NAME).insert(data);
    return res;
}

export async function select(userId: string, opt?: URLQuery) {
    const defaultPageItems = 10;

    let sql = `
    SELECT ${cols.join(', ')} FROM ${TBL_NAME}
    WHERE (user_id = ? AND delete_time IS NULL) `;

    if (opt?.q) sql += `AND (note LIKE '%${opt.q}%' OR category LIKE '%${opt.q}%') `;

    // Order result by the date created
    sql += `ORDER BY created_at DESC `;

    // Apply pagination
    if (opt?.page) {
        opt.per_page = opt.per_page ?? defaultPageItems;
        sql += `LIMIT ${opt.per_page} OFFSET ${(opt.page - 1) * opt.per_page} `;
    } else if (opt?.limit) {
        sql += `LIMIT ${opt.limit} `;
    }

    const res = await db.raw(sql, [userId]);

    return res[0];
}

export async function update(id: string, data: any) {
    const matchedRecord = (await db<Record>(TBL_NAME).select().where('record_id', id))[0];
    
    // Store the previous version to another table
    await db('tbl_previous_records').insert({
        record_id: matchedRecord.record_id,
        category: matchedRecord.category,
        note: matchedRecord.note,
        amount: matchedRecord.amount,
        user_id: matchedRecord.user_id,
        update_time: new Date()
    });

    // Update the record
    const res = await db<Record>(TBL_NAME).update(data).where('record_id', id);

    return res;
}

export async function deleteRecord(id: string) {
    const res = await db<Record>(TBL_NAME).update({'delete_time': new Date()}).where('record_id', id);

    return res;
}