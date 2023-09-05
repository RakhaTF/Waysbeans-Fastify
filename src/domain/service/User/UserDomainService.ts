import * as UserRepository from "@adapters/outbound/repository/UserRepository"
import * as UserDto from "@domain/model/User/User"

export const GetAllActiveUser = async() => await UserRepository.DBGetAllActiveUser()

export const CreateUser = async(user: UserDto.CreateUserRequest) => await UserRepository.DBCreateUser(user)

export const DeleteUser = async(id: number) => await UserRepository.DBSoftDeleteUser(id)

export const GetAllDeletedUser = async() => await UserRepository.DBGetAllDeletedUser()

export const GetOneUser = async(email:string) => await UserRepository.DBGetOneUser(email)