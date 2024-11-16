// UserTable.tsx
import {useFetchUsers} from '../../../hooks/useFetchUsers.ts';
import UserTableRow from "./UserTableRow.tsx";
import {ErrorMessage, LoadingMessage} from "../../../components/Message.tsx";

const UserTable = () => {
    const { users, loading, error } = useFetchUsers();

    if (loading) return <LoadingMessage message="Loading users..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="p-4 my-4 overflow-x-auto">
            <table className="data-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map(user => <UserTableRow key={user.id} user={user} />)
                ) : (
                    <tr>
                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                            No users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;