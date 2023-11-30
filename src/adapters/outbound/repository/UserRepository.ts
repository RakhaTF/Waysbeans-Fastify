import { AppDataSource } from "@infrastructure/mysql/connection";
import * as UserDto from "@domain/model/User/User"
import { User } from "@domain/entity/User/User";
import { DeletedUser } from "@domain/entity/User/DeletedUser";

const dataSource = AppDataSource;
const UserRepository = dataSource.getRepository(User)
const DeletedUserRepository = dataSource.getRepository(DeletedUser)


export async function DBCreateUser(user: UserDto.CreateUserParams): Promise<User> {
  return await UserRepository.save(user)
}

export async function DBDeleteUserAndInsertIntoDelete(user: User) {
  await dataSource.manager.transaction(async transactionalEntityManager => {
    await transactionalEntityManager.save(DeletedUser, { ...user, user_id: user.id });
    await transactionalEntityManager.remove(User, user);
  });
}

export async function DBGetAllDeletedUsers() {
  return await DeletedUserRepository.find()
}

export async function DBGetAllUsers() {
  return await UserRepository.find();
}

export const DBGetOneUser = async ({ email, id }: { email?: string, id?: number }): Promise<User> => await UserRepository.findOne({ where: [{ email }, { id }] })

export const DBUpdateUser = async (updateParams: UserDto.UpdateUserParams) => {
  const { user_id, firstName, lastName, age, email, updatedAt } = updateParams
  return await UserRepository.createQueryBuilder()
    .update(User)
    .set({ firstName, lastName, email, age, updatedAt })
    .where("id = :id", { id: user_id })
    .execute();
}

export async function DBGetDeletedUser(id: number) {
  return await DeletedUserRepository.findOne({ where: { id } });
}

export async function DBCheckUserExists(email: string) {
  return await UserRepository.manager.query<User[]>(`
    SELECT 
    u.id, u.firstname, u.lastname, u.email, u.password, u.age, u.createdAt as register_time
    FROM user u
    WHERE u.email = ?`, [email])
}