import React, { useState } from "react";
import CreateToolForm from "./components/CreateToolForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import { FaPlus } from "react-icons/fa6";
import { ToolTable } from "./components/ToolTable.tsx";

const ToolPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    // Toggles dialog open/close state
    const toggleDialog = () => setIsDialogOpen((prev) => !prev);

    return (
        <div className="">
            <PageHeader
                title="Tools"
                buttonLabel="Add Tool"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog}
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search tools"
            />
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateToolForm />}
                heading="Add Tool"
            />
            <ToolTable />
        </div>
    );
}

export default ToolPage;