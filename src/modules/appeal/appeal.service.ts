import { appealId, createAppealPayload, dateQuery, orderQuery, TAppealId, TCreateAppealPayload, TDateQuery, TOrderQuery } from "../../schemas/appeal.schema";
import createHttpError from "http-errors";
import * as repository from "./appeal.repository";

export const createAppeal = async (payload: TCreateAppealPayload) => {
    const parse = await createAppealPayload.parseAsync(payload);

    return await repository.addAppeal(parse);
};

export const getAppeal = async (params: TAppealId) => {
    const parse = appealId.parse(params);

    return await repository.getAppeal(parse.id);
};

export const changeStatusToWork = async (params: TAppealId) => {
    const parse = await appealId.parseAsync(params);
    await repository.getAppeal(parse.id);
    const count = await repository.changeStatusToWork(parse.id);

    if(!count)
        throw new createHttpError.Conflict('Change status to "in_working" of appeal forbidden, because of the appeal has the status "new"');

    return count;
};

export const getAllAppeals = async () => {
    return await repository.getAllAppeals();
}

export const getAppealsByOrder = async (query: TOrderQuery) => {
    const parse = await orderQuery.parseAsync(query);
    
    return await repository.getAppealsByOrder(parse.order);
}

export const getAppealsByDate = async (query: TDateQuery) => {
    const parse = await dateQuery.parseAsync(query);

    return await repository.getAppealsByDate(parse.date);
}
