import { AppDataSource } from "@infrastructure/mysql/connection";
import fastify from "fastify";
import FastifyUserRoute from "adapters/inbound/http/routes/User";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    throw new Error("Failed to initialize database"); // Throw an error if initialization fails
  });

server.register(FastifyUserRoute);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
