import React, {useState} from "react";
import UserTable from "./components/UserTable.tsx";
import CreateUserForm from "./components/CreateUserForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import {FaPlus} from "react-icons/fa6";

const UserPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div>
            {/* Header Section */}
            <PageHeader
                title="Users "
                buttonLabel="Add User"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog}
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
            <UserTable/>
        </div>
    );
};

export default UserPage;