import { User } from "@domain/entity/User/User"
import * as UserDto from "@domain/model/User/User"
import * as AdminDomainService from "@domain/service/User/UserDomainService"

export async function GetAllActiveUser() {
    const users = await AdminDomainService.GetAllActiveUser()
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

export async function DeleteUser(id:number){
    try {
        const deletedUser = await AdminDomainService.DeleteUser(id);
        return deletedUser
    } catch (error) {
        return error
    }
}

export async function GetAllDeletedUser() {
    const users = await AdminDomainService.GetAllDeletedUser()
    const results = {
        data: users.map(Object.values),
        column: Object.keys(users[0]),
    }
    return results
}