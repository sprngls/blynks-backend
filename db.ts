import Database from "better-sqlite3";

const accounts = new Database('./databases/accounts.db');


export function createDBs() {
    accounts.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        token TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT
        )
    `).run();

}