import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import ProductController from "../controller/ProductController";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/api/v1/product",
        handler: ProductController.getAllProduct
    },
    {
        method: ["POST"],
        url: "/api/v1/product",
        handler: ProductController.createNewProduct
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