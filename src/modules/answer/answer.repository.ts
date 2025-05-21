import createHttpError from "http-errors";
import { AppealStatus, Prisma } from "../../../generated/prisma";
import prisma from "../../prisma/prisma";
import { cancelAllAppeals, cancelAppeal, completeAppeal } from "../appeal/appeal.repository";
import { TAnswerResponse } from "../../schemas/answer.schema";

export const createAnswer = async (answer: Prisma.AnswerCreateWithoutAppealInput, appealId: number, status: AppealStatus): Promise<TAnswerResponse> => {
    return prisma.$transaction(async (tx) => {
        if(status == "completed")
            await complete(appealId, tx);

        if(status == "cancelled")
            await cancel(appealId, tx);

        const result = (await tx.answer.create({
            data: {
                answer: answer.answer,
                appealId: appealId
            }
        })).answer;

        return { message: `Appeal by id ${appealId} ${status}`, answer: result };
    });
};

export const createAnswerForAllCancelled = async (answer: Prisma.AnswerCreateWithoutAppealInput): Promise<Array<TAnswerResponse>> => {
    return prisma.$transaction(async (tx) => {
        const appealsId = await cancelAllAppeals(tx);

        if(appealsId.length == 0)
            throw new createHttpError.Conflict('Cancellation of all appeals forbidden, because of the all appeals has the status "cancelled" or "complete" ');

        const messages: Array<TAnswerResponse> = [];

        for(let i = 0; i < appealsId.length; i++) {
            const result = (await tx.answer.create({
                data: {
                    answer: answer.answer,
                    appealId: appealsId[i].id
                }
            })).answer;

            messages.push({ message: `Appeal by id ${appealsId[i].id} cancelled`, answer: result });
        }

        return messages;
    })
}

const complete = async (appealId: number, tx: Prisma.TransactionClient) => {
    const count = await completeAppeal(appealId, tx);

    if(count == 0)
        throw new createHttpError.Conflict('Complete of appeal forbidden, because of the appeal has the status "new", "cancelled" or "complete"');
}

const cancel = async (appealId: number, tx: Prisma.TransactionClient) => {
    const count = await cancelAppeal(appealId, tx);

    if (count == 0)
        throw new createHttpError.Conflict('Cancellation of appeal forbidden, because of the appeal has the status "completed" or "cancelled"');
}