import { fastifyCors } from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createRoomsQuestionsRoute } from "./http/routes/create-questions.ts";
import { createRoomsRoute } from "./http/routes/create-room.ts";
import { getRoomsQuestionsRoute } from "./http/routes/get-rooms-questions.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { uploadRadioRoute } from "./http/routes/upload-radio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "OK";
});

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomsQuestionsRoute);
app.register(createRoomsQuestionsRoute);
app.register(uploadRadioRoute);

app.listen({ port: env.PORT });
