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

export function addUser(username: string, password: string, email?: string) {
    const token = Math.floor(Math.random() * 9999999999) + 1000000000;
    accounts.prepare(`
        INSERT INTO users (token, username, password, email)
        VALUES (?, ?, ?, ?)
    `).run(token, username, password, email);
    return token;
}