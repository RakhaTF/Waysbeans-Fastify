import * as ProductService from "@application/service/ProductApplicationService"
import { Product } from "@domain/entity/Product/Product";
import * as ProductDto from "@domain/model/Product/Product"
import { FastifyRequest } from "fastify"
import createResult from "helpers/CreateResult"

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

            const existing_product = await ProductService.GetOneProductByName(name)
            if (existing_product && existing_product.name === name) {
                return { message: "PRODUCT ALREADY EXISTS", data: existing_product };
            }
            const new_product = await ProductService.CreateProduct({ price, stock, description, name, photo });
            return new_product 

        } catch (error) {
            console.error(error);
            return { message: "Error occurred", data: null };
        }
    }

    static async DeleteProduct(request: FastifyRequest) {
        try {
            const { id } = request.body as Product
            const deletedProduct = await ProductService.DeleteProduct(id)
            return deletedProduct
        } catch (error) {
            return error
        }
    }
}
