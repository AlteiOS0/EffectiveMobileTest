import { Request, Response } from "express";
import { TAllAppealsResponse, TAppealId, TAppealResponse, TCreateAppealPayload, TDateQuery, TOrderQuery } from "../../schemas/appeal.schema";
import * as appealService from "./appeal.service";
import * as answerService from "../answer/answer.service";
import { TAnswerResponse, TCreateAnswerPayload } from "../../schemas/answer.schema";

export const createAppeal = async (req: Request<{}, {}, TCreateAppealPayload>, res: Response) => {
    const result = await appealService.createAppeal(req.body);

    res.status(201).send(result);
};

export const getAppeal = async (req: Request<TAppealId, {}, {}, TOrderQuery | TDateQuery | {}>, res: Response<TAppealResponse>) => {
    const result = await appealService.getAppeal(req.params);
    res.send(result);
}

export const getAllAppeals = async (req: Request<{}, {}, {}, TOrderQuery | TDateQuery | {}>, res: Response<TAllAppealsResponse>) => {
    if(req.query && 'order' in req.query) {
        const result = await appealService.getAppealsByOrder(req.query);
        res.send(result);
        return;
    } else if (req.query && 'date' in req.query!) {
        const result = await appealService.getAppealsByDate(req.query);
        res.send(result);
        return;
    }

    const result = await appealService.getAllAppeals();

    res.send(result);
}

export const changeStatusToWork = async (req: Request<TAppealId>, res: Response<TAppealId>) => {
    await appealService.changeStatusToWork(req.params);
    
    res.send(req.params);
}

export const cancelAppeal = async (req: Request<TAppealId, {}, TCreateAnswerPayload>, res: Response<TAnswerResponse>) => {
    const result = await answerService.createAnswer(req.body, req.params, "cancelled");

    res.send(result);
}

export const completeAppeal = async (req: Request<TAppealId, {}, TCreateAnswerPayload>, res: Response<TAnswerResponse>) => {
    const result = await answerService.createAnswer(req.body, req.params, "completed");

    res.send(result);
}

export const cancelAllAppeals = async (req: Request<{}, {}, TCreateAnswerPayload>, res: Response) => {
    const result = await answerService.createAnswerForAllCancelled(req.body);

    res.status(202).send(result);
}