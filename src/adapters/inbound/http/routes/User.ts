import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import UserController from "../controller/UserController";
import { CheckAuth } from "helpers/Auth";
import { BasePaginationResultSchema, ResponseSchema } from "helpers/ApiSchema/ApiSchema";

const routes: RouteOptions[] = [
  {
    method: ["GET"],
    url: "/api/v1/test",
    preHandler: CheckAuth,
    handler: async (request, reply) => {
      reply.send("Hello World");
    },
  },
  {
    method: ["GET"],
    url: "/api/v1/user/list",
    handler: UserController.GetAllActiveUser,
    schema: {
      description: "Users List",
      tags: ["Client"],
      summary: "Get Users List",
      response: BasePaginationResultSchema
    }
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
