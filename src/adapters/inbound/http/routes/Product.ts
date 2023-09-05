import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import ProductController from "../controller/ProductController";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/api/v1/product",
        handler: ProductController.prototype.getAllProduct
    },
    {
        method: ["POST"],
        url: "/api/v1/product",
        handler: ProductController.prototype.createNewProduct
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