// Enum for user roles
export enum Role {
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}

// User interface representing the structure of a user object
export interface User {
    id: number; // Unique user identifier
    name: string; // User's name
    email: string; // User's email
    password: string; // User's password (hashed or handled securely in a real app)
    role: Role; // User's role from the Role enum
    createdAt: Date; // Timestamp of when the user was created
    isActive: boolean; // Whether the user is active (default: true)
    contactNumber?: string; // Optional contact number field
}

// Input data for creating a new user
export interface CreateUserInput {
    name: string; // User's name
    email: string; // User's email
    password: string; // User's password (ensure hashing before storing)
    role: Role; // User's role from the Role enum
    isActive?: boolean; // Optional, default to true if not provided
    contactNumber?: string; // Optional contact number
}

// Input data for updating an existing user
export interface UpdateUserInput {
    id: number; // User's unique ID (required for updating)
    name?: string; // Optional updated name
    email?: string; // Optional updated email
    password?: string; // Optional updated password
    role?: Role; // Optional updated role
    isActive?: boolean; // Optional updated status (active/inactive)
    contactNumber?: string; // Optional updated contact number
}