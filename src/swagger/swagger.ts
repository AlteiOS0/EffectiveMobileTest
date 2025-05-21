import { createDocument } from "zod-openapi";
import config from "../config";
import { allAppealsResponse, appealId, appealResponse, createAppealPayload, querySchema } from "../schemas/appeal.schema";
import { badRequest, conflict, internalServerError, notFound } from "../schemas/response.schema";
import { answerResponse, createAnswerPayload, moreAnswerResponse } from "../schemas/answer.schema";

export const document = createDocument({
    openapi: "3.1.0",
    info: {
        title: "Appeal API",
        version: "1.0.0"
    },
    servers: [
        {
            url: `http://127.0.0.1:${config.port}`
        }
    ],
    paths: {
        "/appeals/{id}": {
            get: {
                description: "Get appeal by id and take full information",
                tags: [ 'Appeals' ],
                requestParams: { path: appealId },
                responses: {
                    "200": {
                        description: "Get appeal by id",
                        content: {
                            "application/json": { schema: appealResponse }
                        }
                    },
                    "400": {
                        description: "Id invalid",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "404": {
                        description: "Appeal not found",
                        content: {
                            "application/json": { schema: notFound }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            },
        },
        "/appeals": {
            get: {
                description: "Get appeals by order asc/desc or specific date",
                tags: [ 'Appeals' ],
                requestParams: { query: querySchema  },
                responses: {
                    "200": {
                        description: "Get appeals query",
                        content: {
                            "application/json": { schema: allAppealsResponse }
                        }
                    },
                    "400": {
                        description: "Order or date incorrect",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            },
            post: {
                description: "Create new appeal",
                tags: [ 'Appeals' ],
                requestBody: {
                    description: "Payload",
                    content: {
                        "application/json": { schema: createAppealPayload }
                    }
                },
                responses: {
                    "201": {
                        description: "Create new appeal successfully",
                        content: {
                            "application/json": { schema: appealId }
                        }
                    },
                    "400": {
                        description: "Payload incorrect",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            },
            put: {
                tags: [ "Appeals" ],
                description: "Cancel all appeals",
                requestBody: { 
                    content: {
                        "application/json": { schema: createAnswerPayload }
                    }
                },
                responses: {
                    "200": {
                        description: "All appeals cancelled",
                        content: {
                            "application/json": { schema: moreAnswerResponse }
                        }
                    },
                    "400": {
                        description: "Id invalid or answer type not string",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "409": {
                        description: "Can not be cancelled",
                        content: {
                            "application/json": { schema: conflict }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            }
        },
        "/appeals/{id}/work": {
            put: {
                description: "Taken to work appeal with status 'new'",
                tags: [ "Appeals" ],
                requestParams: { path: appealId },
                responses: {
                    "200": {
                        description: "Taken to work",
                        content: {
                            "application/json": { schema: appealId }
                        }
                    },
                    "400": {
                        description: "Id invalid",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "404": {
                        description: "Appeal not found",
                        content: {
                            "application/json": { schema: notFound }
                        }
                    },
                    "409": {
                        description: "The appeal can not be taken to work",
                        content: {
                            "application/json": { schema: conflict }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            }
        },
        "/appeals/{id}/complete": {
            put: {
                description: "Complete appeal",
                tags: [ "Appeals" ],
                requestParams: { path: appealId },
                requestBody: {
                    description: "Payload",
                    content: {
                        "application/json": { schema: createAnswerPayload }
                    }
                },
                responses: {
                    "200": {
                        description: "Appeal completed",
                        content: {
                            "application/json": { schema: answerResponse }
                        }
                    },
                    "400": {
                        description: "Id invalid or answer type not string",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "409": {
                        description: "The appeal can not be completed",
                        content: {
                            "application/json": { schema: conflict }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            }
        },
        "/appeals/{id}/cancel": {
            put: {
                description: "Cancel appeal",
                tags: [ "Appeals" ],
                requestParams: { path: appealId },
                requestBody: {
                    description: "Payload",
                    content: {
                        "application/json": { schema: createAnswerPayload }
                    }
                },
                responses: {
                    "200": {
                        description: "Appeal cancelled",
                        content: {
                            "application/json": { schema: answerResponse }
                        }
                    },
                    "400": {
                        description: "Id invalid or answer type not string",
                        content: {
                            "application/json": { schema: badRequest }
                        }
                    },
                    "409": {
                        description: "The appeal can not be cancelled",
                        content: {
                            "application/json": { schema: conflict }
                        }
                    },
                    "500": {
                        description: "Internal Server Error",
                        content: {
                            "application/json": { schema: internalServerError }
                        }
                    }
                }
            }
        }
    }
});