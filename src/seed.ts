import { PrismaClient } from "../generated/prisma";
import { TCreateAppealPayload } from "./schemas/appeal.schema";

const prisma = new PrismaClient();

type TCreateAppealPayloadWithDate = TCreateAppealPayload & {
    createAt: string
}

const appeals: Array<TCreateAppealPayloadWithDate> = [
    {
        topic: "Возникла проблема с переводом",
        description: "20.05.2025 был совершен перевод в размере 10000 рублей, денежные средства адресатом получены не были.",
        createAt: new Date("2025-05-21").toISOString()
    },
    {
        topic: "Глючит телефон",
        description: "После покупки телефона 19.05.2025 у клиента возникла проблема такая как выгоревший экран.",
        createAt: new Date("2025-05-20").toISOString()
    },
    {
        topic: "Слетел лицензионный ключ",
        description: "Ключ был куплен 10.05.2025 и спустя несколько после переустановки приложения, ключ перестал подходить, при этом он был куплен на 1 год.",
        createAt: new Date("2025-05-21").toISOString()
    },
    {
        topic: "Сгорел наушник",
        description: "Наушники были приобретены 18.05.2025, в последствии эксплутуации около 4 часов, левый наушник сгорел.",
        createAt: new Date("2025-05-19").toISOString()
    },
    {
        topic: "Сломалась мышь",
        description: "Компьютерная мышь модели А4Tech Bloody не подключается ни к одному устройству",
        createAt: new Date("2025-05-15").toISOString()
    }
] 

const createAppeals = async () => {
    await prisma.appeal.createMany({
        data: appeals
    });
}

(async () => {
    await createAppeals();
    console.log("Appeals created");
})();