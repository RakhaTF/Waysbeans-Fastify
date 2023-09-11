import * as ProductRepository from "@adapters/outbound/repository/ProductRepository"
import * as ProductDto from "@domain/model/Product/Product"

export const GetAllProduct = async() => await ProductRepository.DBGetAllProduct()

export const CreateProduct = async(params: ProductDto.CreateProductRequest) => await ProductRepository.DBCreateProduct(params)

export const GetOneProductByName = async (product_name: string) => await ProductRepository.DBGetOneProductByName(product_name)

export const GetOneProductById = async (product_id: number) => await ProductRepository.DBGetOneProductById(product_id)

// export const DeleteProduct = async (product_id: number) => {
//     const product = await ProductRepository.DBGetOneProductByName(product_id)

//     const deleteProduct = await ProductRepository.DBDeleteProduct(product)
// }