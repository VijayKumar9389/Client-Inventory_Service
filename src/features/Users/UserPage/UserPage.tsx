import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useFetchUsers } from "../../../hooks/useFetchUsers.ts";
import { ErrorMessage } from "../../../components/layout/Message.tsx";
import PageHeader from "../../../components/layout/PageHeader.tsx";
import UserFilter from "./components/UserFilter.tsx";
import Dialog from "../../../components/layout/Dialog.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import UserList from "./components/UserList.tsx";
import UserTable from "./components/UserTable.tsx";
import RenderView from "../../../components/layout/RenderView.tsx";

const UserPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { users = [], loading, error } = useFetchUsers(); // Default to empty array if users is undefined

    const handleSearch = (value: string) => setSearchTerm(value);
    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            {/* Header Section */}
            <PageHeader
                title="Users"
                buttonLabel="Add User"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog}
                count={users.length}
            />

            {/* User Filter */}
            <UserFilter
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users"
            />

            {/* Dialog for CreateUserForm */}
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateUserForm />}
                heading="Add User"
            />

            <RenderView
                loading={loading}
                error={error}
                listComponent={<UserList users={filteredUsers} loading={loading} />}
                tableComponent={<UserTable users={filteredUsers} loading={loading} />}
            />
        </div>
    );
};

export default UserPage;