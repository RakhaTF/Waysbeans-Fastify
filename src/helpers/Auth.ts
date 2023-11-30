import { AuthUser } from "@application/service/Auth"
import { FastifyReply, FastifyRequest } from "fastify"

export const CheckAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = request.headers.authorization
        await AuthUser(token)
    } catch (error) {
        reply.code(401).send({ error: "Unauthorized!" })
    }
}