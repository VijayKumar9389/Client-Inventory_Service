import { User } from "../../../models/user.models.ts";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserTableRow: React.FC<{ user: User }> = ({ user }) => {
    const navigate = useNavigate();

    const goToUserDetail = () => {
        navigate(`/users/${user.id}`);
    };

    return (
        <tr onClick={goToUserDetail} className="user-table-row" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && goToUserDetail()}>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.isActive ? 'Active' : 'Inactive'}</td>
        </tr>
    );
};

export default UserTableRow;