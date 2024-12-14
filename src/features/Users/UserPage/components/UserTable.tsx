import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../models/user.models.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {FaUser} from "react-icons/fa";

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
    const navigate = useNavigate();

    const goToUserDetail = (id: number) => {
        navigate(`/users/${id}`);
    };

    return (
        <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr
                            key={user.id}
                            onClick={() => goToUserDetail(user.id)}
                        >
                            <td><ImageWithAlt imageName={null} altIcon={FaUser} className="image-square"/></td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    );
};

export default UserTable;
