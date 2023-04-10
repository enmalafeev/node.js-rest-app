import fastify from "fastify";
import Swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import AutoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify();

server.register(Swagger);
server.register(fastifySwaggerUi);
server.register(AutoLoad, {
  dir: join(__dirname, "routes"),
  forceESM: true,
});

server.listen({ port: 3000 });
