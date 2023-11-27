import bcrypt from "bcrypt";


export function encryptPassword(password: string) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 16, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
}


export function comparePassword(password: string, hash: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
            if (err) reject(err);

            resolve(same);
        });
    });
}