import AuthRoute from "@adapters/inbound/http/routes/Auth";
import ProductRoute from "@adapters/inbound/http/routes/Product";
import UserRoute from "@adapters/inbound/http/routes/User";
import fp from "fastify-plugin";

export default fp(async (fastify, options) => {
    await fastify.register(AuthRoute, options),
    await fastify.register(UserRoute, options),
    await fastify.register(ProductRoute, options)
})