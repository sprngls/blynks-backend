import type { Request, Response } from "express";

type RegisterBody = {
    username: string,
    password: string;
    email?: string;
}

export const registerUser = (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { username, password, email } = req.body;
    console.log(`Username: ${username}\nPasswort: ${password}\nemail: ${email}`)
    res.send("test")
};