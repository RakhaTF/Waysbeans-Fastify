import * as ProductRepository from "@adapters/outbound/repository/ProductRepository"
import * as ProductDto from "@domain/model/Product/Product"

export const GetAllProduct = async () => await ProductRepository.DBGetAllProduct()

export const CreateProduct = async (params: ProductDto.CreateProductRequest) => await ProductRepository.DBCreateProduct(params)

export const GetOneProductByName = async (name: string) => await ProductRepository.DBGetOneProductByName(name)

export const GetOneProductById = async (id: number) => await ProductRepository.DBGetOneProductById(id)

export const DeleteProduct = async (id: number) => {
    const product = await ProductRepository.DBDeleteProduct(id)
    if (product.affected < 1) {
        throw new Error("Delete Failed!")
    }
}