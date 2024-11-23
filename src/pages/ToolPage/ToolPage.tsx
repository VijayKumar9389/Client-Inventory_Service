import React, { useState } from "react";
import CreateToolForm from "./components/CreateToolForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import { FaPlus } from "react-icons/fa6";
import ToolList from "./components/ToolList.tsx";
import {useFetchTools} from "../../hooks/useFetchTools.ts";
import { ErrorMessage, LoadingMessage} from "../../components/Message.tsx";
import ToolFilter from "./components/ToolFilter.tsx";

const ToolPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { tools, error, loading } = useFetchTools();

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    // Toggles dialog open/close state
    const toggleDialog = () => setIsDialogOpen((prev) => !prev);

    // Filter tools based on search term
    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <LoadingMessage message="Loading tools..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="page-container">
            <PageHeader
                title="Tools"
                buttonLabel="Add Tool"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog}
                count={tools.length}
            />
            <ToolFilter value={searchTerm} onChange={handleSearch} placeholder="Search tools" />
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateToolForm />}
                heading="Add Tool"
            />
            <ToolList tools={filteredTools} />
        </div>
    );
}

export default ToolPage;