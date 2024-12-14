import React, {useState} from "react";
import CreateToolForm from "./components/CreateToolForm.tsx";
import Dialog from "../../../components/layout/Dialog.tsx";
import PageHeader from "../../../components/layout/PageHeader.tsx";
import {FaPlus} from "react-icons/fa6";
import ToolList from "./components/ToolList.tsx";
import {useFetchTools} from "../../../hooks/useFetchTools.ts";
import ToolFilter from "./components/ToolFilter.tsx";
import ToolTable from "./components/ToolTable.tsx";
import RenderView from "../../../components/layout/RenderView.tsx";

const ToolPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {tools, error, loading} = useFetchTools();

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    // Toggles dialog open/close state
    const toggleDialog = () => setIsDialogOpen((prev) => !prev);

    // Filter tools based on search term
    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            {/* Header Section */}
            <PageHeader
                title="Tools"
                buttonLabel="Add Tool"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog}
                count={tools.length}
            />

            {/* Tool Filter */}
            <ToolFilter
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search tools"
            />

            {/* Dialog for CreateToolForm */}
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateToolForm/>}
                heading="Add Tool"
            />

            {/* Conditionally render tool List or error */}
            <RenderView
                loading={loading}
                error={error}
                listComponent={<ToolList tools={filteredTools}/>}
                tableComponent={<ToolTable tools={filteredTools}/>}
            />
        </div>
    );
}

export default ToolPage;