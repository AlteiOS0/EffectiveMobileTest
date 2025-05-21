import { appealId, TAppealId } from "../../schemas/appeal.schema";
import { createAnswerPayload, TCreateAnswerPayload } from "../../schemas/answer.schema";
import * as repository from "./answer.repository";
import { AppealStatus } from "../../../generated/prisma";
import { getAppeal } from "../appeal/appeal.repository";

export const createAnswer = async (payload: TCreateAnswerPayload, params: TAppealId, status: AppealStatus) => {
    const parsePayload = await createAnswerPayload.parseAsync(payload);
    const parseParams = await appealId.parseAsync(params);
    await getAppeal(parseParams.id);

    return await repository.createAnswer(parsePayload, parseParams.id, status);
}

export const createAnswerForAllCancelled = async (payload: TCreateAnswerPayload) => {
    const parse = await createAnswerPayload.parseAsync(payload);

    return await repository.createAnswerForAllCancelled(parse);
}