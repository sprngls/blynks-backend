import express from "express";
import { createDBs } from "./db.ts";

createDBs();

const app = express();
const port = 1050;

app.use(express.json());

import registerRoute from './routes/register.ts';

app.use('/register', registerRoute);

app.listen(port, '0.0.0.0', () => {
    console.log('Server Start auf port 1050');
});