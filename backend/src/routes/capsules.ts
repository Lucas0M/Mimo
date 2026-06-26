import { Router } from "express";
import {
  createCapsuleController,
  getCapsuleBySlugController,
  listCapsulesController,
} from "../controllers/capsules.controller.js";

export const capsulesRouter = Router();

capsulesRouter.get("/", listCapsulesController);
capsulesRouter.get("/:slug", getCapsuleBySlugController);
capsulesRouter.post("/", createCapsuleController);
