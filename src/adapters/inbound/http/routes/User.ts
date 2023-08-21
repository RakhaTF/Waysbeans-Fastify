import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import UserController from "../controller/UserController";

const routes: RouteOptions[] = [
  {
    method: ["GET"],
    url: "/api/v1/test",
    handler: async (request, reply) => {
      reply.send("Hello World");
    },
  },
  {
    method: ["GET"],
    url: "/api/v1/user",
    handler: UserController.prototype.GetAllUser
  },
  {
    method: ["POST"],
    url: "/api/v1/user",
    handler: UserController.prototype.CreateUser
  }
];

export default async function FastifyUserRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  for (const route of routes) {
    fastify.route({ ...route, config: options });
  }
}
