import * as UserRepository from "@adapters/outbound/repository/UserRepository"
import { User } from "@domain/entity/User/User"
import * as UserDto from "@domain/model/User/User"

export const CreateUser = async (user: UserDto.CreateUserParams) => await UserRepository.DBCreateUser(user)

export const DeleteUserDomain = async (user: User) => {
    await UserRepository.DBDeleteUserAndInsertIntoDelete(user)
}

export const GetAllDeletedUser = async () => await UserRepository.DBGetAllDeletedUsers()

export async function GetAllUsersDomain() {
    return await UserRepository.DBGetAllUsers();
}

export const GetUserDomain = async (params: { email?: string, id?: number }): Promise<User> => {
    if (params.email) {
        return await UserRepository.DBGetOneUser({ email: params.email });
    } else if (params.id) {
        return await UserRepository.DBGetOneUser({ id: params.id });
    } else {
        throw new Error("Either email or id must be provided");
    }
}

export const UpdateUser = async (updateParams: UserDto.UpdateUserParams) => {
    const updateUser = await UserRepository.DBUpdateUser(updateParams)
    if (updateUser.affected < 1) {
        throw new Error("Failed To Update User");
    }
}

export const GetDeletedUserDomain = async (id: number) => {
    return await UserRepository.DBGetDeletedUser(id)
}

export const CheckUserExistsDomain = async (email: string) => {
    const user = await UserRepository.DBCheckUserExists(email);
    if (!user) {
        throw new Error("Data not found!")
    }
    return user;
}