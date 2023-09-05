import { Product } from "@domain/entity/Product";
import { AppDataSource } from "@infrastructure/mysql/connection";
import * as ProductDto from "@domain/model/Product/Product"
const dataSource = AppDataSource;
const ProductRepository = dataSource.getRepository(Product)

export const DBGetAllProduct = async () => await ProductRepository.createQueryBuilder("product").getMany();

export const DBCreateNewProduct = async (params:ProductDto.CreateProductRequest) => await ProductRepository.createQueryBuilder("product").insert().into(Product).values(params).execute()