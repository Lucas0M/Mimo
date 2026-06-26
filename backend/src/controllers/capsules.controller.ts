import type { Request, Response } from "express";
import { capsulesService } from "../services/capsules.service.js";

const demoCapsule = {
  id: "demo-capsule",
  title: "Capsula Aurora",
  slug: "capsula-aurora-demo",
  recipientName: "Isabela",
  occasion: "Aniversario de namoro",
  songUrl: "https://example.com/audio-demo.mp3",
  letter:
    "Quero guardar neste presente tudo o que a gente construiu e tudo o que ainda vem pela frente.",
  timelineItems: [
    {
      imageUrl: "https://placehold.co/1200x900/png?text=Foto+1",
      caption: "Nosso primeiro jantar",
      sortOrder: 0,
    },
    {
      imageUrl: "https://placehold.co/1200x900/png?text=Foto+2",
      caption: "A viagem que virou memoria",
      sortOrder: 1,
    },
    {
      imageUrl: "https://placehold.co/1200x900/png?text=Foto+3",
      caption: "O dia em que tudo fez sentido",
      sortOrder: 2,
    },
  ],
};

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeTimelineItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalizedItems = value
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as {
        imageUrl?: unknown;
        caption?: unknown;
        sortOrder?: unknown;
      };

      if (
        !isNonEmptyString(candidate.imageUrl) ||
        !isNonEmptyString(candidate.caption)
      ) {
        return null;
      }

      return {
        imageUrl: String(candidate.imageUrl).trim(),
        caption: String(candidate.caption).trim(),
        sortOrder:
          typeof candidate.sortOrder === "number" ? candidate.sortOrder : index,
      };
    })
    .filter(
      (
        item,
      ): item is { imageUrl: string; caption: string; sortOrder: number } =>
        item !== null,
    );

  return normalizedItems;
}

export function getDemoCapsuleController(
  _request: Request,
  response: Response,
) {
  response.json({ data: demoCapsule });
}

export async function listCapsulesController(
  _request: Request,
  response: Response,
) {
  const capsules = await capsulesService.listCapsules();
  response.json({ data: capsules });
}

export async function getCapsuleBySlugController(
  request: Request,
  response: Response,
) {
  const { slug } = request.params;

  if (typeof slug !== "string") {
    response.status(400).json({ error: "Invalid slug" });
    return;
  }

  const capsule = await capsulesService.getCapsuleBySlug(slug);

  if (!capsule) {
    response.status(404).json({ error: "Capsule not found" });
    return;
  }

  response.json({ data: capsule });
}

export async function createCapsuleController(
  request: Request,
  response: Response,
) {
  const {
    title,
    slug,
    recipientName,
    occasion,
    songUrl,
    letter,
    timelineItems,
  } = request.body ?? {};

  if (!isNonEmptyString(title) || !isNonEmptyString(letter)) {
    response.status(400).json({
      error: "title and letter are required",
    });

    return;
  }

  const capsule = await capsulesService.createCapsule({
    title: title.trim(),
    slug: isNonEmptyString(slug) ? slug.trim() : undefined,
    recipientName: isNonEmptyString(recipientName)
      ? recipientName.trim()
      : undefined,
    occasion: isNonEmptyString(occasion) ? occasion.trim() : undefined,
    songUrl: isNonEmptyString(songUrl) ? songUrl.trim() : undefined,
    letter: letter.trim(),
    timelineItems: normalizeTimelineItems(timelineItems),
  });

  response.status(201).json({ data: capsule });
}

export const createDraftCapsuleController = createCapsuleController;
