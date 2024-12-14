import React, { useState } from 'react';
import { createUser } from '../../../../services/user.services.ts';
import { CreateUserInput, Role } from '../../../../models/user.models.ts';
import PrimaryButton from "../../../../components/common/PrimaryButton.tsx";
import { FaSync } from "react-icons/fa";

const CreateUserForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // New state for 'email'
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(Role.EMPLOYEE);
    const [isActive, setIsActive] = useState(true); // New state for 'isActive'
    const [contactNumber, setContactNumber] = useState(''); // New state for 'contactNumber'
    const [error, setError] = useState<string | null>(null);

    const handleCreateUser = async () => {

        // Validate required fields
        if (!name || !email || !password) {
            setError('Name, email, and password are required.');
            return;
        }

        setError(null);
        const newUser: CreateUserInput = {
            name,
            email, // Include email in the user input
            password,
            role,
            isActive,
            contactNumber: contactNumber || undefined, // Only include contactNumber if provided
        };

        try {
            await createUser(newUser);
            // Reset form fields after successful creation
            setName('');
            setEmail(''); // Reset email
            setPassword('');
            setRole(Role.EMPLOYEE);
            setIsActive(true); // Reset to default value
            setContactNumber(''); // Reset contact number
        } catch {
            setError('Failed to create user. Please try again.');
        }
    };

    return (
        <form className="form-container">
            {error && <div className="form-error">{error}</div>}
            <label className="form-label" htmlFor="name">Name</label>
            <input
                id="name"
                className="form-input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label" htmlFor="email">Email</label>
            <input
                id="email"
                className="form-input"
                type="email" // Use type="email" for validation
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="password">Password</label>
            <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="role">Role</label>
            <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
            >
                <option value={Role.EMPLOYEE}>Employee</option>
                <option value={Role.MANAGER}>Manager</option>
                <option value={Role.ADMIN}>Admin</option>
            </select>

            <label className="form-label" htmlFor="isActive">Is Active</label>
            <label className="switch">
                <input
                    id="isActive"
                    className="form-checkbox"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                <span className="switch-bg">
                    <span className="switch-thumb"></span>
                </span>
            </label>

            <label className="form-label" htmlFor="contactNumber">Contact Number (Optional)</label>
            <input
                id="contactNumber"
                className="form-input"
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
            />

            <PrimaryButton
                onClick={handleCreateUser}
                label="Create User"
                Icon={FaSync}
                className="form-button"
                disabled={!name || !email || !password} // Disable if required fields are empty
            />
        </form>
    );
};

export default CreateUserForm;