import React, {useState} from "react";
import LocationList from "./components/LocationList.tsx";
import CreateLocationForm from "./components/CreateLocationForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import {FaPlus} from "react-icons/fa6";
import LocationFilter from "./components/LocationFilter.tsx";
import {ErrorMessage} from "../../components/Message.tsx";
import {useFetchLocations} from "../../hooks/useFetchLocations.ts";

// Main LocationPage component
const LocationPage: React.FC = () => {
    const {locations, error, loading} = useFetchLocations();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for managing dialog
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (value: string) => setSearchTerm(value);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            {/* Header Section */}
            <PageHeader
                title="Locations"
                buttonLabel="Add Location"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog} // Handle button click
                count={locations.length}
            />

            {/* Location Filter */}
            <LocationFilter
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search locations"
            />

            {/* Dialog for CreateLocationForm */}
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateLocationForm/>} // Pass setError to the form
                heading="Add Location"
            />

            {/* Conditionally render Location List or error */}
            {error ? (
                <ErrorMessage message="Error retrieving locations" />
            ) : (
                <LocationList locations={filteredLocations} loading={loading}/>
            )}
        </div>
    );
};

export default LocationPage;