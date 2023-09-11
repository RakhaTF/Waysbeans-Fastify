import * as ProductRepository from "@adapters/outbound/repository/ProductRepository"
import * as ProductDto from "@domain/model/Product/Product"

export const GetAllProduct = async() => await ProductRepository.DBGetAllProduct()

export const CreateProduct = async(params: ProductDto.CreateProductRequest) => await ProductRepository.DBCreateProduct(params)

export const GetOneProduct = async (name: string) => await ProductRepository.DBGetOneProduct(name)