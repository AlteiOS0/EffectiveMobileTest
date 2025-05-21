import { AppealStatus, Prisma } from "../../../generated/prisma"
import prisma from "../../prisma/prisma"
import { TAllAppealsResponse } from "../../schemas/appeal.schema";

export const addAppeal = async (appeal: Prisma.AppealCreateWithoutAnswerInput) => {
    return await prisma.appeal.create({
        data: {
            topic: appeal.topic,
            description: appeal.description,
            createAt: appeal.createAt,
            status: AppealStatus.new,
        },
        select: {
            id: true
        }
    });
};

export const getAppeal = async (id: number) => {
    return await prisma.appeal.findFirstOrThrow({
        where: {
            id: id
        },
        include: {
            answer: true
        }
    });
};

export const getAllAppeals = async () => {
    return await prisma.appeal.findMany({
        omit: {
            description: true
        }
    });
}

export const changeStatusToWork = async (id: number) => {
    return (await prisma.appeal.updateMany({
        where: {
            id: id,
            status: "new"
        },
        data: {
            status: "in_working"
        }
    })).count;
};

export const cancelAppeal = async (id: number, prismaClient: Prisma.TransactionClient): Promise<number> => {
    return (await prismaClient.appeal.updateMany({
        where: {
            id: id,
            OR: [
                {
                    status: "in_working"
                },
                {
                    status: "new"
                }
            ]
        },
        data: {
            status: "cancelled"
        }
    })).count;
};

export const cancelAllAppeals = async (prismaClient: Prisma.TransactionClient) => {
    return await prismaClient.appeal.updateManyAndReturn({
        where: {
            AND: [
                {
                    status: {
                        not: "completed"
                    }
                },
                {
                    status: {
                        not: "cancelled"
                    }
                }
            ]
        },
        data: {
            status: "cancelled"
        },
        select: {
            id: true
        }
    });
};

export const getAppealsByOrder = async (order: Prisma.SortOrder) => {
    return await prisma.appeal.findMany({
        orderBy: {
            createAt: order
        },
        omit: {
            description: true
        }
    });
};

export const getAppealsByDate = async (date: string): Promise<TAllAppealsResponse> => {
    return await prisma.$queryRaw`SELECT id, topic, create_at, status FROM appeals WHERE CAST(create_at AS date) = ${date}::date`;
};

export const completeAppeal = async (id: number, prismaClient: Prisma.TransactionClient): Promise<number> => {
    return (await prismaClient.appeal.updateMany({
        where: {
            id: id,
            status: "in_working"
        },
        data: {
            status: "completed"
        }
    })).count;
};