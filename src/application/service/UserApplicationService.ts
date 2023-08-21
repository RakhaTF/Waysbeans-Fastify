import { User } from "@domain/entity/User"
import * as UserDto from "@domain/model/User/User"
import * as AdminDomainService from "@domain/service/User/UserDomainService"
import Joi from "joi"

export async function GetAllUser() {
    const users = await AdminDomainService.GetAllUser()

    const results = {
        data: users.map(Object.values),
        column: Object.keys(users[0]),
    }

    return results
}

export async function CreateUser(params: UserDto.CreateUserRequest): Promise<User> {
    try {
        const newUser = await AdminDomainService.CreateUser(params);
        return newUser;
    } catch (error) {
        return error
    }
}

