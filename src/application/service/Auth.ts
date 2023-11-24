import * as UserDto from "@domain/model/User/User"
import * as UserSchema from "helpers/JoiSchema/User";
import * as UserDomainService from "@domain/service/User/UserDomainService"
import moment from 'moment'

export async function Register(params: UserDto.CreateUserRequest) {
    const { firstName, lastName, age, email, password } = params
    const { error } = UserSchema.Register.validate({ firstName, lastName, age, email, password });

    if (error) {
        const errorMessages = error.details.map((detail) => ({
            path: detail.path.join('.'),
            message: detail.message
        }));
        throw { message: "Validation errors", data: errorMessages };
    }

    const existingUser = await UserDomainService.GetUserDomain({ email })
    if (existingUser && existingUser.email == email) {
        throw new Error("Email already in use.");
    }

    return await UserDomainService.CreateUser({ ...params, createdAt: moment().unix(), updatedAt: moment().unix() });
}

export async function Login(params:  UserDto.LoginParams) {
    const { email, password } = params
    const { error } = UserSchema.Login.validate({ email, password });

    if (error) {
        const errorMessages = error.details.map((detail) => ({
            path: detail.path.join('.'),
            message: detail.message
        }));
        throw { message: "Validation errors", data: errorMessages };
    }

    const checkPassword = await UserDomainService.CheckUserExistsDomain(email)
    
    if(checkPassword !== password){
        throw new Error("Password doesn't match!")
    }



}