import type { Request, Response } from "express";
import crypto from "crypto";

type RegisterBody = {
    username: string,
    password: string;
    email?: string;
}

import Database from "better-sqlite3";

const db = new Database("./databases/accounts.db");

export const registerUser = (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { username, password, email } = req.body;
    const token = crypto
    .createHash("sha256")
    .update(username + password)
    .digest("hex");
    
    db.prepare("INSERT INTO users (username, password, email, token) VALUES (?, ?, ?, ?)").run(username, password, email, token);

    res.send("test")
    };