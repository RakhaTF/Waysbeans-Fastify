import * as ProductRepository from "@adapters/outbound/repository/ProductRepository"
import * as ProductDto from "@domain/model/Product/Product"

export const GetAllProduct = async() => await ProductRepository.DBGetAllProduct()

export const CreateNewProduct = async(params: ProductDto.CreateProductRequest) => await ProductRepository.DBCreateNewProduct(params)