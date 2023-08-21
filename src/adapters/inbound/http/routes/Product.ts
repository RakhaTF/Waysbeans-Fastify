import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/api/v1/product-test",
        handler: async (request, reply) => {
            reply.send("Hello World");
        },
    },
]

export default async function ProductRoute(
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) {
    for (const route of routes) {
        fastify.route({ ...route, config: options });
    }
}