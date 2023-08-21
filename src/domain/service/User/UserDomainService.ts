import * as UserRepository from "@adapters/outbound/repository/UserRepository"
import * as UserDto from "@domain/model/User/User"

export async function GetAllUser() {
    return await UserRepository.DBGetAllUser()
}

export async function CreateUser(user: UserDto.CreateUserRequest) {
    return await UserRepository.DBCreateUser(user)
}