// useFetchUsers.ts
import { useState, useEffect } from 'react';
import { getAllUsers, getUserById } from "../services/user.services";
import { User } from "../models/user.models";

// Define a custom hook that fetches all users
export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch {
                setError("Failed to load users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error, setUsers };
};

// Define a custom hook that fetches a user by ID
export const useFetchUserById = (userId: number) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
            } catch {
                setError("Failed to load user. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, loading, error };
};