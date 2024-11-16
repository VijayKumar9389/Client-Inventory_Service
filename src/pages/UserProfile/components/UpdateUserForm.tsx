import React, { useEffect, useState } from "react";
import { updateUser } from "../../../services/user.services.ts";
import { Role, User, UpdateUserInput } from "../../../models/user.models.ts";
import PrimaryButton from "../../../components/PrimaryButton.tsx";
import { FaSync } from "react-icons/fa";

interface UpdateUserFormProps {
    user: User | null;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<Role>(Role.EMPLOYEE);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [contactNumber, setContactNumber] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setIsActive(user.isActive ?? true);
            setContactNumber(user.contactNumber ?? "");
        }
    }, [user]);

    const handleUpdateUser = async () => {
        if (user) {
            const updatedUserData: UpdateUserInput = {
                id: user.id,
                name: name !== user.name ? name : undefined,
                email: email !== user.email ? email : undefined,
                password: password || undefined,
                role: role !== user.role ? role : undefined,
                isActive: isActive !== user.isActive ? isActive : undefined,
                contactNumber: contactNumber !== user.contactNumber ? contactNumber : undefined,
            };

            try {
                await updateUser(updatedUserData);
                setError(""); // Reset error message after successful update
            } catch {
                setError("Error updating user. Please try again.");
            }
        }
    };

    return (
        <form className="form-container">
            {error && <p className="form-error">{error}</p>}
            <div className="mb-4">
                <label htmlFor="userName" className="form-label">New Name</label>
                <input
                    id="userName"
                    className="form-input"
                    type="text"
                    placeholder="Enter new name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="userEmail" className="form-label">Email</label>
                <input
                    id="userEmail"
                    className="form-input"
                    type="email"
                    placeholder="Enter new email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="userPassword" className="form-label">Password</label>
                <input
                    id="userPassword"
                    className="form-input"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="userRole" className="form-label">Role</label>
                <select
                    id="userRole"
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                >
                    <option value={Role.EMPLOYEE}>Employee</option>
                    <option value={Role.MANAGER}>Manager</option>
                    <option value={Role.ADMIN}>Admin</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="userIsActive" className="form-label">Active Status</label>
                <input
                    id="userIsActive"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input
                    id="contactNumber"
                    className="form-input"
                    type="tel"
                    placeholder="Enter contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
            </div>
            <PrimaryButton
                onClick={handleUpdateUser}
                label="Update User"
                Icon={FaSync}
                className="form-button"
                disabled={!name || !email || role === user?.role}
            />
        </form>
    );
};

export default UpdateUserForm;

