import * as ProductService from "@application/service/ProductApplicationService"
import * as ProductDto from "@domain/model/Product/Product"
import { FastifyRequest } from "fastify"
import createResult from "helpers/CreateResult"

export default class ProductController {
    static async GetAllProduct() {
        try {
            const products = await ProductService.GetAllProduct()
            return createResult(products)
        } catch (error) {
            console.error(error)
        }
    }

    static async CreateProduct(request: FastifyRequest) {
        try {
            const { name, price, stock, description, photo } = request.body as ProductDto.CreateProductRequest
            return await ProductService.CreateProduct({ price, stock, description, name, photo });
        } catch (error) {
            throw error;
        }
    }

    static async DeleteProduct(request: FastifyRequest) {
        try {
            const { id } = request.body as { id: number }
            return await ProductService.DeleteProduct(id)
        } catch (error) {
            return error
        }
    }
}
