import request from "supertest";
import app from "../app";
import { after, describe, test, before } from "node:test";
import assert from "node:assert";
import { TAllAppealsResponse, TAppealResponse } from "../schemas/appeal.schema";
import { TAnswerResponse } from "../schemas/answer.schema";
import prisma from "../prisma/prisma";

// Test database is use

before(async () => {
    await prisma.$connect();
    await prisma.$queryRaw`TRUNCATE TABLE appeals, answers RESTART IDENTITY CASCADE`;
});

after(async () => {
    await prisma.$queryRaw`TRUNCATE TABLE appeals, answers RESTART IDENTITY CASCADE`;
    await prisma.$disconnect();
});

/**
* without hh:mm:ss.msms
* 
* input 2020-01-01T00:00:00Z
* 
* output 2020-01-01
*/ 
const enCaDateFormat = (date: Date | string): string => {
    return new Date(date).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })
};

const enCaDateFormatObj = (obj: object) => {
    if ("createAt" in obj) {
        return obj.createAt = enCaDateFormat(obj.createAt as Date);
    }
}

describe("Appeal", () => {
    test("POST /appeals", async () => {
        const response = await request(app)
            .post("/appeals")
            .send({
                topic: "Test appeal",
                description: "This is a test appeal"
            });

        assert.strictEqual(201, response.statusCode);
        assert.strictEqual(1, response.body.id);
    });
    test("GET /appeals", async () => {
        const response = await request(app)
            .get("/appeals")

        const appeals: TAllAppealsResponse = response.body;
        enCaDateFormatObj(appeals[0]);

        assert.strictEqual(200, response.statusCode)
        assert.deepEqual([
            {
                id: 1,
                topic: "Test appeal",
                status: "new",
                createAt: appeals[0].createAt
            }
        ], appeals);
    });
    test("GET /appeals/:id", async () => {
        const response = await request(app).get("/appeals/1");
        const appeal: TAppealResponse = response.body;
        enCaDateFormatObj(appeal);
        const actual = {
            id: 1,
            topic: "Test appeal",
            description: "This is a test appeal",
            status: "new",
            createAt: appeal.createAt,
            answer: null
        };

        assert.strictEqual(200, response.statusCode);
        assert.deepStrictEqual(actual, appeal);
    });
    test("PUT /appeals/:id/work", async () => {
        const response = await request(app).put("/appeals/1/work");
        const actual = {
            id: "1"
        };

        assert.strictEqual(200, response.statusCode);
        assert.deepStrictEqual(actual, response.body);
    });
    test("PUT /appeals/:id/complete", async () => {
        const response = await request(app).put("/appeals/1/complete").send({
            answer: "Test completed"
        });
        const actual: TAnswerResponse = {
            message: "Appeal by id 1 completed",
            answer: "Test completed"
        };

        assert.strictEqual(200, response.statusCode);
        assert.deepStrictEqual(actual, response.body);
    })
});