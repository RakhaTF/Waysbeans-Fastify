import { AppDataSource } from "@infrastructure/mysql/connection";
import * as UserDto from "@domain/model/User/User"
import { User } from "@domain/entity/User";

const dataSource = AppDataSource;
const UserRepository = dataSource.getRepository(User)

export async function DBGetAllUser() {
  const users = await UserRepository.find()
  return users;
}

export async function DBCreateUser(user: UserDto.CreateUserRequest) {
  try {
    // Check if user already exists
    const existingUser = await UserRepository.findOne({ where: { email: user.email } });
    if (existingUser) {
      return existingUser;
    }
    await UserRepository.save(user)
    const createdUser = await UserRepository.findOneBy({ email: user.email })
    return createdUser;
  } catch (error) {
    console.error(error)
    return error
  }
}
