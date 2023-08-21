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
    handler: UserController.prototype.GetAllActiveUser
  },
  {
    method: ["POST"],
    url: "/api/v1/user",
    handler: UserController.prototype.CreateUser
  },
  {
    method: ["DELETE"],
    url: "/api/v1/user",
    handler: UserController.prototype.DeleteUser
  },
  {
    method: ["GET"],
    url: "/api/v1/deleted-user",
    handler: UserController.prototype.GetAllDeletedUser
  }
];

export default async function UserRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  for (const route of routes) {
    fastify.route({ ...route, config: options });
  }
}
