import knex from "knex";

const db = knex({
    client: "mysql2",
    connection: {
        user: process.env["DB_USER"] ?? "root",
        host: process.env["DB_HOST"] ?? "localhost",
        port: parseInt(process.env["DB_PORT"] ?? "3306"),
        database: process.env["DB_NAME"] ?? "expense"
    },
    pool: {
        min: 0,
        max: 5
    }
});

export default db;
