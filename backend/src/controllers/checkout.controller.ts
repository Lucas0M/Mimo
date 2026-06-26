import type { Request, Response } from "express";
import { capsulesService } from "../services/capsules.service.js";

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function createCheckoutSessionController(
  request: Request,
  response: Response,
) {
  const { capsuleId } = request.body ?? {};

  if (!isNonEmptyString(capsuleId)) {
    response.status(400).json({ error: "capsuleId is required" });
    return;
  }

  const session = await capsulesService.createCheckoutSession(capsuleId.trim());

  response.status(201).json({ data: session });
}
