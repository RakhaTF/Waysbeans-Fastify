import { FastifyRequest } from "fastify";
import * as UserService from "@application/service/UserApplicationService"
import * as UserDto from "@domain/model/User/User"
import { User } from "@domain/entity/User/User";
import * as UserSchema from "helpers/JoiSchema/User";
import createResult from "helpers/CreateResult";

export default class UserController {
  static async GetAllActiveUser() {
    try {
      const users = await UserService.GetAllActiveUser()
      const results = createResult(users)
      return results
    } catch (x_x) {
      console.error(x_x)
    }
  }

  static async CreateUser(request: FastifyRequest) {
    try {
      const { firstName, lastName, age, email } = request.body as UserDto.CreateUserRequest;

      // Validate the request body
      const { error } = UserSchema.Register.validate({ firstName, lastName, age, email });

      if (error) {
        const errorMessages = error.details.map((detail) => ({
          path: detail.path.join('.'),
          message: detail.message
        }));
        return { message: "Validation errors", data: errorMessages };
      }

      const existingUser = await UserService.GetOneUser(email)
      if (existingUser && existingUser.email === email) {
        return { message: "USER ALREADY EXISTS", data: existingUser };
      } else {
        const newUser = await UserService.CreateUser({ firstName, lastName, age, email });
        return { message: "USER CREATED", data: newUser };
      }

    } catch (error) {
      console.error(error);
      return { message: "Error occurred", data: null };
    }
  }

  static async DeleteUser(request: FastifyRequest) {
    try {
      const { id } = request.body as User
      const deletedUser = await UserService.DeleteUser(id)
      if (typeof deletedUser === "object") {
        return { message: "User deleted", data: deletedUser }
      } else {
        return { message: deletedUser }
      }
    } catch (error) {
      return error
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
    const { user_id, firstName, lastName, age, email } = request.body as UserDto.UpdateUserRequest;
    try {
      console.log({ user_id });
      const updateUser = await UserService.UpdateUser({ user_id, firstName, lastName, age, email })
      return updateUser
    } catch (error) {
      console.error(error)
    }
  }
}