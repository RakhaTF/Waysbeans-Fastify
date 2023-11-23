import { User } from "@domain/entity/User/User"
import * as UserDto from "@domain/model/User/User"
import * as UserDomainService from "@domain/service/User/UserDomainService"
import * as UserSchema from "helpers/JoiSchema/User";
import moment from 'moment'

export async function GetAllActiveUser() {
    const users = await UserDomainService.GetAllUsersDomain()
    if (users.length < 1) {
        return "NO USER FOUND"
    }
    const results = {
        data: users.map(Object.values),
        column: Object.keys(users[0]),
    }
    return results
}

export async function CreateUser(params: UserDto.CreateUserRequest) {
    const { firstName, lastName, age, email } = params
    const { error } = UserSchema.Register.validate({ firstName, lastName, age, email });

    if (error) {
        const errorMessages = error.details.map((detail) => ({
            path: detail.path.join('.'),
            message: detail.message
        }));
        throw { message: "Validation errors", data: errorMessages };
    }

    const existingUser = await UserDomainService.GetUserDomain({ email })
    if (existingUser && existingUser.email == email) {
        throw new Error("User Already Exists");
    }

    return await UserDomainService.CreateUser({ ...params, createdAt: moment().unix(), updatedAt: moment().unix() });
}

export async function DeleteUser(id: number) {
    const user = await UserDomainService.GetUserDomain({ id })
    await UserDomainService.DeleteUserDomain(user)
    return true
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
        const existingUser = await UserDomainService.GetUserDomain({ email })
        return existingUser
    } catch (error) {
        return error
    }
}

export const UpdateUser = async (params: UserDto.UpdateUserRequest) => {
    const { age, email, firstName, lastName, user_id} = params
    let updateData: Partial<User> = {};
    if (firstName || lastName || age || email) {
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (age) updateData.age = age;
        if (email) updateData.email = email;
    }
    await UserDomainService.UpdateUser({...updateData, updatedAt: moment().unix(), user_id})
    return true;
}