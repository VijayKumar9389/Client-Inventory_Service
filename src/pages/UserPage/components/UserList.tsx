import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/user.models.ts";
import { ErrorMessage, LoadingMessage } from "../../../components/Message.tsx";

const UserList: React.FC<{ users: User[], loading: boolean }> = ({ users, loading }) => {
    const navigate = useNavigate();

    const goToUserDetail = (id: number) => {
        navigate(`/users/${id}`);
    };

    if (loading) return <LoadingMessage message="Loading users..." />;

    return (
        <div className="list-container">
            {users.length ? (
                users.map(user => (
                    <div key={user.id} className="card-container" onClick={() => goToUserDetail(user.id)}>
                        {/* Image Section (User Logo Placeholder) */}
                        <div className="card-image">
                            <div className="user-logo">
                                <span className="user-logo-text">{user.name[0]}</span>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="card-details">
                            <h2 className="card-title">{user.name}</h2>
                            <div className="card-grid">
                                <div>
                                    <span className="card-label">Role</span>
                                    <p className="card-value">{user.role}</p>
                                </div>
                                <div>
                                    <span className="card-label">Status</span>
                                    <p className="card-value">{user.isActive ? 'Active' : 'Inactive'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <ErrorMessage message="No users found." />
            )}
        </div>
    );
};

export default UserList;