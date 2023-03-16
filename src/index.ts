import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
// import { Server, IncomingMessage, ServerResponse } from "http";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
    server.get("/ping", opts, async (request, reply) => {
      return { pong: "it worked!" };
    });

    const start = async () => {
      try {
        await server.listen({ port: 3000 });

        const address = server.server.address();
        const port = typeof address === "string" ? address : address?.port;
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    };
    start();
  })
  .catch((error) => console.log(error));
