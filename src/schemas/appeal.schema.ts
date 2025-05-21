import { z } from "zod";
import { AppealStatus } from "../../generated/prisma";
import { badRequest, internalServerError } from "./response.schema";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const createAppealPayload = z.object({
    topic: z.string().nonempty("Topic not must be empty"),
    description: z.string().nonempty("Description not must be empty")
});

export const appealId = z.object({
    id: z.preprocess((val: any) => parseInt(val, 10), z.number().int())
});

export const orderQuery = z.object({
    order: z.enum(["asc", "desc"])
});

export const dateQuery = z.object({
    date: z.string()
});

export const querySchema = z.object({
    order: z.optional(z.enum([ "asc", "desc" ])),
    date: z.optional(z.string())
});

export const appealResponse = z.object({
    id: z.number().int(),
    topic: z.string(),
    description: z.string(),
    status: z.nativeEnum(AppealStatus),
    createAt: z.date(),
    answer: z.nullable(z.object({
        id: z.number().int(),
        answer: z.string(),
        createAt: z.date(),
        appealId: z.number().int(),
    }))
});

export const allAppealsResponse = z.array(z.object({
    id: z.number().int(),
    topic: z.string(),
    status: z.nativeEnum(AppealStatus),
    createAt: z.date()
}));


export const createAppealSchema = z.object({
    schema: z.object({
        tags: z.array(z.literal('Appeal')),
        body: createAppealPayload,
        response: z.object({
            200: z.number().int(),
            400: badRequest,
            500: internalServerError
        })
    })
});

export type TCreateAppealPayload = z.infer<typeof createAppealPayload>;
export type TAppealId = z.infer<typeof appealId>;
export type TOrderQuery = z.infer<typeof orderQuery>;
export type TDateQuery = z.infer<typeof dateQuery>;
export type TAppealResponse = z.infer<typeof appealResponse>;
export type TAllAppealsResponse = z.infer<typeof allAppealsResponse>;