import { Router } from "express";
import {cancelAllAppeals, cancelAppeal, changeStatusToWork, completeAppeal, createAppeal, getAllAppeals, getAppeal}from "./appeal.controller";

const appealRouter = Router();

appealRouter.post("/appeals", createAppeal);
appealRouter.get("/appeals", getAllAppeals);
appealRouter.get("/appeals/:id", getAppeal);
appealRouter.put("/appeals/:id/work", changeStatusToWork);
appealRouter.put("/appeals/:id/cancel", cancelAppeal);
appealRouter.put("/appeals/:id/complete", completeAppeal);
appealRouter.put("/appeals", cancelAllAppeals);

export default appealRouter;