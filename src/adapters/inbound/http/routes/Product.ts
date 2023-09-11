import { FastifyInstance, FastifyPluginOptions, RouteOptions } from "fastify";
import ProductController from "../controller/ProductController";

const routes: RouteOptions[] = [
    {
        method: ["GET"],
        url: "/api/v1/product",
        handler: ProductController.GetAllProduct
    },
    {
        method: ["POST"],
        url: "/api/v1/product",
        handler: ProductController.CreateProduct
    },
    {
        method: ["DELETE"],
        url: "/api/v1/product",
        handler: ProductController.DeleteProduct
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