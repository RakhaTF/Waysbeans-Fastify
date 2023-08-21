import { FastifyRequest } from "fastify";
import * as UserService from "@application/service/UserApplicationService"
import * as UserDto from "@domain/model/User/User"
import { User } from "@domain/entity/User";
import * as UserSchema from "helpers/JoiSchema/User";

export default class UserController {
  async GetAllUser() {
    try {
      const users = await UserService.GetAllUser()
      const results = createResult(users)
      return results
    } catch (x_x) {
      console.error(x_x)
    }
  }

  async CreateUser(request: FastifyRequest): Promise<{ message: string, data: any }> {
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

      const newUser = await UserService.CreateUser({ firstName, lastName, age, email });

      if (newUser.email !== email) {
        return { message: "USER CREATED", data: newUser };
      } else {
        return { message: "USER ALREADY EXISTS", data: newUser };
      }
    } catch (error) {
      console.error(error);
      return { message: "Error occurred", data: null };
    }
  }

}

function createResult(message?: any, data?: string | string[] | User) {
  return { message, data };
}