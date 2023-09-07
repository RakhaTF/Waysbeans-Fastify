export type CreateUserRequest = {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

export type UpdateUserRequest = {
    user_id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

export type UpdateUserParams = {
    user_id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}