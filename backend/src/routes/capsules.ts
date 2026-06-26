import { Router } from "express";
import {
  createCapsuleController,
  createDraftCapsuleController,
  getDemoCapsuleController,
  getCapsuleBySlugController,
  listCapsulesController,
} from "../controllers/capsules.controller.js";

export const capsulesRouter = Router();

capsulesRouter.get("/", listCapsulesController);
capsulesRouter.get("/demo", getDemoCapsuleController);
capsulesRouter.get("/:slug", getCapsuleBySlugController);
capsulesRouter.post("/", createCapsuleController);
capsulesRouter.post("/drafts", createDraftCapsuleController);
