import { count, desc, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const getRoomsQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        querystring: z.object({
          page: z.string().optional().default("1"),
          limit: z.string().optional().default("10"),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params;
      const { page, limit } = request.query;
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 10;
      const offset = (pageNumber - 1) * limitNumber;

      const result = await db
        .select({
          id: schema.questions.id,
          question: schema.questions.question,
          answer: schema.questions.answer,
          createdAt: schema.questions.createdAt,
        })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId))
        .orderBy(desc(schema.questions.createdAt))
        .limit(limitNumber)
        .offset(offset);

      const totalCountResult = await db
        .select({ count: count(schema.questions.id) })
        .from(schema.questions)
        .where(eq(schema.questions.roomId, roomId));

      const totalCount = totalCountResult[0]?.count || 0;
      const totalPages = Math.ceil(totalCount / limitNumber);

      return {
        questions: result,
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
