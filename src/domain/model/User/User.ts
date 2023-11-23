export type CreateUserRequest = {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

export type CreateUserParams = CreateUserRequest & {
    createdAt: number;
    updatedAt: number;
}

export type UpdateUserRequest = {
    user_id: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
}

export type UpdateUserParams = UpdateUserRequest & {
    updatedAt: number;
}