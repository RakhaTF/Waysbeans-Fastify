import { Product } from "@domain/entity/Product/Product";
import { User } from "@domain/entity/User/User";

export default function createResult(message?: any, data?: string | string[] | User | Product) {
    return { message, data };
}