import type { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

type RegisterBody = {
    username: string,
    password: string;
    email?: string;
}

import Database from "better-sqlite3";

const db = new Database("./databases/accounts.db");

export const registerUser = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try { 
        let { username, password, email } = req.body;
        if (typeof username !== "string" || typeof password !== "string" ) {
            return res.status(400).send({ success: false, message: "Username und Passwort sind erforderlich." });
        }
        const token = crypto.randomBytes(32).toString("hex");
        const existent = db.prepare("SELECT 1 FROM users WHERE username = ?").get(username);
        if (existent) {
            return res.status(400).send({ success: false, message: "Benutzername bereits vergeben." });
        }

        if (password.length < 8) {
            return res.status(400).send({ success: false, message: "Passwort ist zu kurz." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        if (email && typeof email === "string") {
            email = email.toLowerCase().trim();
        }

        username = username.trim();
        
        db.prepare("INSERT INTO users (username, password, email, token) VALUES (?, ?, ?, ?)").run(username, hashedPassword, email, token);

        res.send({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Fehler beim registrieren des Nutzers." });
    }
    
};