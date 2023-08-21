import * as UserRepository from "@adapters/outbound/repository/UserRepository"
import * as UserDto from "@domain/model/User/User"

export async function GetAllActiveUser() {
    return await UserRepository.DBGetAllActiveUser()
}

export async function CreateUser(user: UserDto.CreateUserRequest) {
    return await UserRepository.DBCreateUser(user)
}

export async function DeleteUser(id: number) {
    return await UserRepository.DBSoftDeleteUser(id)
}

export async function GetAllDeletedUser(){
    return await UserRepository.DBGetAllDeletedUser()
}