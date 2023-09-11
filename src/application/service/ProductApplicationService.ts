import { Product } from "@domain/entity/Product"
import * as ProductDto from "@domain/model/Product/Product"
import * as ProductDomainService from "@domain/service/Product/ProductDomainService"

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
    try {
        return await ProductDomainService.CreateProduct(params)
    } catch (error) {
        return error
    }
}

export const GetOneProduct = async (name: string): Promise<Product> => {
    try {
        return await ProductDomainService.GetOneProduct(name)
    } catch (error) {
        return error
    }
}