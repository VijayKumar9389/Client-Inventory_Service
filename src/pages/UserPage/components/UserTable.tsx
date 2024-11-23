import { User } from "../../../models/user.models.ts";

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
    return (
        <div className="list-container">
            {users.length > 0 ? (
                users.map((user) => (
                    <div key={user.id} className="card-container">
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
                <div className="px-6 py-4 text-center text-gray-500">
                    No users found.
                </div>
            )}
        </div>
    );
};

export default UserTable;