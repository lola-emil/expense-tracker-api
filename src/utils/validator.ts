import { Transaction } from "../dal/transaction";
import { User } from "../dal/user";
import { Wallet } from "../dal/wallet";
import { transactionSchema, walletSchema } from "./schemas";
import * as UserRepo from "../dal/user";
import { compare } from "bcrypt";

export async function loginValidator(user: User) {
    const { email, password } = user;

    if (!email || !password)
        return "Please fill all the required fields";

    const matchedUser = await UserRepo.findByEmail(email);
    
    if (!matchedUser)
        return "Invalid email or password";

    if (!(await compare(password, matchedUser.password)))
        return "Invalid email or password";
    
    return null;
}

export function transactionValidator(transaction: Transaction) {
    const { error } = transactionSchema.validate(transaction);

    if (error)
        return error.message;

    return null;
}

export function walletValidator(wallet: Wallet) {
    const { error } = walletSchema.validate(wallet);

    if (error)
        return error.message;

    return null;
}
