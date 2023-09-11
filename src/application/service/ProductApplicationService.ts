import { Product } from "@domain/entity/Product/Product"
import * as ProductDto from "@domain/model/Product/Product"
import * as ProductDomainService from "@domain/service/Product/ProductDomainService"
import * as ProductSchema from "helpers/JoiSchema/Product";

export async function GetAllProduct() {
    const products = await ProductDomainService.GetAllProduct()
    if (products.length < 1) {
        return "NO PRODUCT FOUND"
    }
    const results = {
        data: products.map(Object.values),
        column: Object.keys(products[0]),
    }
    return results
}

export const CreateProduct = async (params: ProductDto.CreateProductRequest) => {
    const { name, price, stock, description, photo } = params
    try {
        // Validate the request body
        const { error } = ProductSchema.NewProduct.validate({ name, price, stock, description, photo });

        if (error) {
            const errorMessages = error.details.map((detail) => ({
                path: detail.path.join('.'),
                message: detail.message
            }));
            return { error: "Validation errors", data: errorMessages };
        }
        const new_product = await ProductDomainService.CreateProduct(params)
        return { message: "PRODUCT CREATED", data: new_product }
    } catch (error) {
        return error
    }
}

export const GetOneProductByName = async (product_name: string): Promise<Product> => await ProductDomainService.GetOneProductByName(product_name)

export const DeleteProduct = async (id: number) => {
    return await ProductDomainService.GetOneProductById(id)
}