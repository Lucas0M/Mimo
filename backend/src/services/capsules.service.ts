import { prisma } from "../lib/prisma.js";

type TimelineItemInput = {
  imageUrl: string;
  caption: string;
  sortOrder?: number;
};

type CreateCapsuleInput = {
  title: string;
  slug: string;
  songUrl?: string;
  letter: string;
  timelineItems?: TimelineItemInput[];
};

export const capsulesService = {
  listCapsules() {
    return prisma.capsule.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        timelineItems: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  },

  getCapsuleBySlug(slug: string) {
    return prisma.capsule.findUnique({
      where: { slug },
      include: {
        timelineItems: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  },

  async createCapsule(input: CreateCapsuleInput) {
    const timelineItems = input.timelineItems ?? [];

    return prisma.capsule.create({
      data: {
        title: input.title,
        slug: input.slug,
        songUrl: input.songUrl,
        letter: input.letter,
        timelineItems: {
          create: timelineItems.map((item, index) => ({
            imageUrl: item.imageUrl,
            caption: item.caption,
            sortOrder: item.sortOrder ?? index,
          })),
        },
      },
      include: {
        timelineItems: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  },
};
