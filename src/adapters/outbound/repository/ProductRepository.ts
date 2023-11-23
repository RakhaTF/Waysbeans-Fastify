import { Product } from "@domain/entity/Product/Product";
import { AppDataSource } from "@infrastructure/mysql/connection";
import * as ProductDto from "@domain/model/Product/Product"
import { DeletedProduct } from "@domain/entity/Product/DeletedProduct";
const dataSource = AppDataSource;
const ProductRepository = dataSource.getRepository(Product)
const DeletedProductRepository = dataSource.getRepository(DeletedProduct)

export const DBGetAllProduct = async () => await ProductRepository.createQueryBuilder("product").getMany();

export const DBCreateProduct = async (product: ProductDto.CreateProductRequest) => {
    await ProductRepository.save(product)
    const createdProduct = await ProductRepository.findOneBy({ name: product.name })
    return createdProduct;
}

export const DBGetOneProductByName = async (product_name: string): Promise<Product> => await ProductRepository.findOneBy({ name: product_name })

export const DBGetOneProductById = async (product_id: number): Promise<Product> => await ProductRepository.findOneBy({ id: product_id })

export const DBDeleteProduct = async (id: number) => await ProductRepository.delete(id)

export const DBInsertProductToTrash = async (product: Product) => await DeletedProductRepository.save(product)
