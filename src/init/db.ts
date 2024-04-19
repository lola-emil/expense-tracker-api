import knex from "knex";

const db = knex({
    client: "mysql2",
    connection: {
        user: "root",
        host: "localhost",
        port: 3306,
        database: "expense"
    },
    pool: {
        min: 0,
        max: 5
    }
});

export default db;
