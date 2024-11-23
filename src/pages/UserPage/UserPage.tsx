import React, {useState} from "react";
import UserTable from "./components/UserTable.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import {FaPlus} from "react-icons/fa6";
import {useFetchUsers} from "../../hooks/useFetchUsers.ts";
import UserFilter from "./components/UserFilter.tsx";
import {ErrorMessage, LoadingMessage} from "../../components/Message.tsx";

const UserPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {users, loading, error} = useFetchUsers();

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    // filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <LoadingMessage message="Loading users..."/>;
    if (error) return <ErrorMessage message={error}/>;

    return (
        <div className="page-container">
            {/* Header Section */}
            <PageHeader
                title="Users "
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
                element={<CreateUserForm/>}
                heading="Add User"
            />

            {/* User Table */}
            <UserTable users={filteredUsers}/>
        </div>
    );
};

export default UserPage;