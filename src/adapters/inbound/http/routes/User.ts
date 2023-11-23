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
    url: "/api/v1/user/list",
    handler: UserController.GetAllActiveUser
  },
  {
    method: ["POST"],
    url: "/api/v1/user/create",
    handler: UserController.CreateUser
  },
  {
    method: ["PATCH"],
    url: "/api/v1/user/update",
    handler: UserController.UpdateUser
  },
  {
    method: ["DELETE"],
    url: "/api/v1/user/delete",
    handler: UserController.DeleteUser
  },
  {
    method: ["GET"],
    url: "/api/v1/user/deleted-list",
    handler: UserController.GetAllDeletedUser
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
