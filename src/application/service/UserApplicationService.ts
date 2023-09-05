import { User } from "@domain/entity/User/User"
import * as UserDto from "@domain/model/User/User"
import * as UserDomainService from "@domain/service/User/UserDomainService"

export async function GetAllActiveUser() {
    const users = await UserDomainService.GetAllActiveUser()
    if (users.length < 1) {
        return "NO USER FOUND"
    }
    const results = {
        data: users.map(Object.values),
        column: Object.keys(users[0]),
    }
    return results
}

export async function CreateUser(params: UserDto.CreateUserRequest): Promise<User> {
    try {
        const newUser = await UserDomainService.CreateUser(params);
        return newUser;
    } catch (error) {
        return error
    }
}

export async function DeleteUser(id: number) {
    try {
        const deletedUser = await UserDomainService.DeleteUser(id);
        return deletedUser
    } catch (error) {
        return error
    }
}

export async function GetAllDeletedUser() {
    const users = await UserDomainService.GetAllDeletedUser()
    if (users.length < 1) {
        return "NO USER FOUND"
    }
    const results = {
        data: users.map(Object.values),
        column: Object.keys(users[0]),
    }
    return results
}

export const GetOneUser = async (email: string): Promise<User> => {
    try {
        const existingUser = await UserDomainService.GetOneUser(email)
        return existingUser
    } catch (error) {
        return error
    }
}