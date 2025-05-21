import { z } from "zod";

export const createAnswerPayload = z.object({
    answer: z.string().nonempty("Answer not must be empty")
});

export const answerResponse = z.object({
    message: z.string(),
    answer: z.string()
});

export const moreAnswerResponse = z.array(answerResponse);

export type TCreateAnswerPayload = z.infer<typeof createAnswerPayload>;
export type TAnswerResponse = z.infer<typeof answerResponse>;