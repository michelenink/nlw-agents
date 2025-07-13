import { asc, count, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/rooms",
    {
      schema: {
        querystring: z.object({
          page: z.string().optional().default("1"),
          limit: z.string().optional().default("10"),
        }),
      },
    },
    async (request) => {
      const { page, limit } = request.query;
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;
      const offset = (pageNumber - 1) * limitNumber;

      const results = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
          createdAt: schema.rooms.createdAt,
          questionCount: count(schema.questions.id),
        })
        .from(schema.rooms)
        .leftJoin(
          schema.questions,
          eq(schema.rooms.id, schema.questions.roomId)
        )
        .groupBy(schema.rooms.id, schema.rooms.name)
        .orderBy(asc(schema.rooms.createdAt))
        .limit(limitNumber)
        .offset(offset);

      const totalCountResult = await db
        .select({ count: count(schema.rooms.id) })
        .from(schema.rooms);

      const totalCount = totalCountResult[0]?.count || 0;
      const totalPages = Math.ceil(totalCount / limitNumber);

      return {
        rooms: results,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalCount,
          totalPages,
          hasNextPage: pageNumber < totalPages,
          hasPreviousPage: pageNumber > 1,
        },
      };
    }
  );
};
