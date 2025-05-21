import { Response } from "express";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

interface IPrismaException {
    [k: string]: (err: PrismaClientKnownRequestError, res: Response) => void
}

const prismaException: IPrismaException = {
    "P2002": (err, res) => {
        res.status(409).json({ statusCode: 409, status: "Conflict", message: `Unique constrain failed on the: ${JSON.stringify(err.meta)}` });
        return;
    },
    "P2003": (err, res) => {
        res.status(400).json({ statusCode: 400, status: "Bad Request", message: `Foreign key constrain failed: ${JSON.stringify(err.meta)}` });
        return;
    },
    "P2025": (err, res) => {
        res.status(404).json({ statusCode: 404, status: "Not Found", message: `Record not found ${JSON.stringify(err.meta)}` });
        return;
    },
    "P2010": (err, res) => {
        res.status(400).json({ statusCode: 400, status: "Bad Request", message: `Raw query failed: ${JSON.stringify(err.meta)}` });
        return;
    }
};

export default prismaException;