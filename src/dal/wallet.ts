import db from "../init/db";

const TBL_NAME = "tblwallets";

export interface Wallet {
    wallet_id: string;
    name: string;
    balance: number;
    user_id: string;
}

export async function insert(data: Wallet) {
    const result = await db<Wallet>(TBL_NAME).insert(data);
    return result;
}

export async function getWallets(userId: string): Promise<Wallet[]> {
    const result = await db<Wallet>(TBL_NAME).select().where("user_id", userId);
    return result;
}

export async function deleteWallet(id: string) {
    const result = await db<Wallet>(TBL_NAME).delete().where("wallet_id", id);
    return result;
}