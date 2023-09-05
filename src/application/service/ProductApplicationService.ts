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

export const CreateNewProduct = async (params: ProductDto.CreateProductRequest) => {
    console.log({ params })
}