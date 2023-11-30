import { AppDataSource } from "@infrastructure/mysql/connection";
import fastify from "fastify";
import FastifyRouteAddon from "@application/boot/fastify/route";
import FastifySwaggerAddon from "./application/boot/fastify/swagger"
import FastifyBaseAddon from "./application/boot/fastify/base"


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

server.register(FastifyBaseAddon)
server.register(FastifySwaggerAddon)
server.register(FastifyRouteAddon)


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});