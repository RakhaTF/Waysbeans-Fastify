import * as ProductService from "@application/service/ProductApplicationService"
import * as ProductDto from "@domain/model/Product/Product"
import { FastifyRequest } from "fastify"
import createResult from "helpers/CreateResult"
import * as ProductSchema from "helpers/JoiSchema/Product";

export default class ProductController {
    static async GetAllProduct() {
        try {
            const products = await ProductService.GetAllProduct()
            const results = createResult(products)
            return results
        } catch (error) {
            console.error(error)
        }
    }

    static async CreateProduct(request: FastifyRequest) {
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

            const existingProduct = await ProductService.GetOneProduct(name)
            if (existingProduct && existingProduct.name === name) {
                return { message: "PRODUCT ALREADY EXISTS", data: existingProduct };
            } else {
                const newUser = await ProductService.CreateProduct({ price, stock, description, name, photo });
                return { message: "PRODUCT CREATED", data: newUser };
            }

        } catch (error) {
            console.error(error);
            return { message: "Error occurred", data: null };
        }
    }
}
