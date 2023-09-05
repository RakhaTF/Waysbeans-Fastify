import { AppDataSource } from "@infrastructure/mysql/connection";
import * as UserDto from "@domain/model/User/User"
import { User } from "@domain/entity/User/User";
import { DeletedUser } from "@domain/entity/User/DeletedUser";

const dataSource = AppDataSource;
const UserRepository = dataSource.getRepository(User)

export async function DBGetAllActiveUser() {
  const users = await UserRepository.createQueryBuilder("user")
    .where("user.isDeleted IS NULL")
    .getMany();
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

export async function DBSoftDeleteUser(id: number) {
  const deletedUserRepository = dataSource.getRepository(DeletedUser);
  const userRepository = dataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: id } });
  if (!user) {
    return "User not found"
  } else if (user && !user.isDeleted) {
    const alreadyDeleted = await deletedUserRepository.findOne({ where: { userId: user.id } });
    if (!alreadyDeleted) {
      const deletedUser = new DeletedUser();
      deletedUser.userId = user.id;
      deletedUser.deletedAt = new Date();

      await deletedUserRepository.save(deletedUser);

      user.isDeleted = true;
      await userRepository.save(user);
      return deletedUser;
    }
  } else if (user.isDeleted) {
    return "User is already deleted"
  }
}

export async function DBGetAllDeletedUser() {
  const users = await UserRepository.createQueryBuilder("user")
    .where("user.isDeleted = :isDeleted", {isDeleted:true})
    .getMany();
  return users;
}

export const DBGetOneUser = async (email: string): Promise<User> => await UserRepository.findOne({ where: { email: email } })
