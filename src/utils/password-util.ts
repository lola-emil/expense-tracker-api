import bcrypt from "bcrypt";


export function encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
}


export function comparePassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
            if (err) reject(err);

            resolve(same);
        });
    });
}