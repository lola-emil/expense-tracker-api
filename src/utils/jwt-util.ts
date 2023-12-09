import jwt from "jsonwebtoken";



export function signToken(payload: string | object | Buffer, secretKey: jwt.Secret) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { expiresIn: "1h" }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
}


export function verifyToken(token: string, secretKey: jwt.Secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, {}, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });
}