import { Product } from "@domain/entity/Product";
import { AppDataSource } from "@infrastructure/mysql/connection";
import * as ProductDto from "@domain/model/Product/Product"
const dataSource = AppDataSource;
const ProductRepository = dataSource.getRepository(Product)

export const DBGetAllProduct = async () => await ProductRepository.createQueryBuilder("product").getMany();

export const DBCreateProduct = async (product: ProductDto.CreateProductRequest) => {
    await ProductRepository.save(product)
    const createdProduct = await ProductRepository.findOneBy({ name: product.name })
    return createdProduct;
}

export const DBGetOneProduct = async (name: string): Promise<Product> => await ProductRepository.findOneBy({name: name})