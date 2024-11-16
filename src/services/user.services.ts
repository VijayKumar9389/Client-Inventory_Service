import {CreateUserInput, UpdateUserInput, User} from "../models/user.models.ts";

const API_URL = "http://localhost:3000/api/users";

export const createUser = async (userData: CreateUserInput): Promise<User> => {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(`${API_URL}`);
    return response.json();
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

export const updateUser = async (userData: UpdateUserInput): Promise<User> => {
    const response = await fetch(`${API_URL}/${userData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};