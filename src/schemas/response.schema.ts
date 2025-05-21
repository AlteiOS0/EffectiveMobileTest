import { z } from "zod";

export const badRequest = z.object({
    statusCode: z.literal(400),
    status: z.literal("Bad Request"),
    message: z.string()
});

export const notFound = z.object({
    statusCode: z.literal(404),
    status: z.literal("Not Found"),
    message: z.string()
});

export const conflict = z.object({
    statusCode: z.literal(409),
    status: z.literal("Conflict"),
    message: z.string()
});

export const internalServerError = z.object({
    statusCode: z.literal(500),
    status: z.literal("Internal Server Error"),
    message: z.string()
});