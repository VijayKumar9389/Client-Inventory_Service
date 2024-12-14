import React, { useState } from "react";
import Dialog from "../../../components/layout/Dialog.tsx";
import PageHeader from "../../../components/layout/PageHeader.tsx";
import { FaPlus } from "react-icons/fa6";
import SiteFilter from "./components/SiteFilter.tsx";
import { useFetchSites } from "../../../hooks/location.hooks.ts";
import CreateSiteForm from "./components/CreateSiteForm.tsx";
import SiteList from "./components/SiteList.tsx";
import SiteTable from "./components/SiteTable.tsx";
import RenderView from "../../../components/layout/RenderView.tsx";

// Main SitePage component
const SitePage: React.FC = () => {
    const { sites, error, loading } = useFetchSites();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for managing dialog
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (value: string) => setSearchTerm(value);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div className="page-container">
            {/* Header Section */}
            <PageHeader
                title="Sites"
                buttonLabel="Add Site"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog} // Handle button click
                count={sites.length}
            />

            {/* Location Filter */}
            <SiteFilter
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search Sites"
            />

            {/* Dialog for CreateLocationForm */}
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateSiteForm />} // Pass setError to the form
                heading="Add Site"
            />

            {/* Render the list or table using RenderView */}
            <RenderView
                loading={loading}
                error={error}
                listComponent={<SiteList sites={sites} />}
                tableComponent={<SiteTable sites={sites} />}
            />
        </div>
    );
};

export default SitePage;