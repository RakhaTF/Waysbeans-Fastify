import * as ProductService from "@application/service/ProductApplicationService"
import * as ProductDto from "@domain/model/Product/Product"
import { FastifyRequest } from "fastify"
import createResult from "helpers/CreateResult"
import * as ProductSchema from "helpers/JoiSchema/Product";

export default class ProductController {
    async getAllProduct() {
        try {
            const products = await ProductService.GetAllProduct()
            const results = createResult(products)
            return results
        } catch (error) {
            console.error(error)
        }
    }

    async createNewProduct(request: FastifyRequest) {
        try {
            const { name, price, stock, description, photo } = request.body as ProductDto.CreateProductRequest

            // Validate the request body
            const { error } = ProductSchema.NewProduct.validate({ name, price, stock, description, photo });

            if (error) {
                const errorMessages = error.details.map((detail) => ({
                    path: detail.path.join('.'),
                    message: detail.message
                }));
                return { message: "Validation errors", data: errorMessages };
            }
            console.log({ name, price, stock, description, photo })
        } catch (error) {
            console.error(error)
        }
    }
}
