import { FastifyRequest } from "fastify";
import * as UserService from "@application/service/UserApplicationService"
import * as UserDto from "@domain/model/User/User"
import { User } from "@domain/entity/User/User";
import createResult from "helpers/CreateResult";

export default class UserController {
  static async GetAllActiveUser() {
    try {
      const users = await UserService.GetAllActiveUser()
      const results = createResult(users)
      return results
    } catch (error) {
      throw error
    }
  }

  static async CreateUser(request: FastifyRequest) {
    try {
      const newUser = await UserService.CreateUser(request.body as UserDto.CreateUserRequest);
      return { message: "USER CREATED", data: newUser };
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  static async DeleteUser(request: FastifyRequest) {
    try {
      const { id } = request.body as User
      const deleteUser = await UserService.DeleteUser(id)
      return { message: deleteUser }
    } catch (error) {
      throw error
    }
  }

  static async GetAllDeletedUser() {
    try {
      const users = await UserService.GetAllDeletedUser()
      const results = createResult(users)
      return results
    } catch (error) {
      console.error(error)
    }
  }

  static async UpdateUser(request: FastifyRequest) {
    try {
      const updateUser = await UserService.UpdateUser(request.body as UserDto.UpdateUserRequest)
      return { message: updateUser }
    } catch (error) {
      throw error
    }
  }
}