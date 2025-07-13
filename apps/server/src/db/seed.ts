import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, {
  rooms: schema.rooms,
  questions: schema.questions,
});

await seed(db, {
  rooms: schema.rooms,
  questions: schema.questions,
}).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 100,
      columns: {
        question: f.loremIpsum({ sentencesCount: 1 }),
        answer: f.loremIpsum({ sentencesCount: 2 }),
      },
    },
  };
});

await sql.end();
