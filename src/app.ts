import express, { json, Request, Response, Express, NextFunction } from "express";
import { pinoHttp } from "pino-http";
import { HttpError } from "http-errors";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { ZodError } from "zod";
import appealRouter from "./modules/appeal/appeal.router";
import prismaException from "./prisma/exception";
import swaggerUi from 'swagger-ui-express';
import { document } from "./swagger/swagger";

const app: Express = express();

app.use(pinoHttp());
app.use(json());

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(document, { explorer: true }));

app.use(appealRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof HttpError) {
        res.status(err.statusCode).json({ statusCode: err.statusCode, status: err.name, message: err.message});
        return;
    }

    if(err instanceof PrismaClientKnownRequestError) {
        prismaException[err.code](err, res);
        return;
    }

    if(err instanceof ZodError) {
        res.status(400).json({ statusCode: 400, status: "Bad Request", message: err.errors});
        return;
    }

    res.status(500).json({ statusCode: 500, status: "Internal Server Error", message: err.message});
    req.log.error(err, err.message);
});

export default app;