import {useState} from "react";
import {LocationTable} from "./components/LocationTable.tsx";
import CreateLocationForm from "./components/CreateLocationForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import {FaPlus} from "react-icons/fa6";
import LocationFilter from "./components/LocationFilter.tsx";
import {ErrorMessage, LoadingMessage} from "../../components/Message.tsx";
import {useFetchLocations} from "../../hooks/useFetchLocations.ts"; // Import the dialog component

// Main LocationPage component
const LocationPage = () => {
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

    if (loading) return <LoadingMessage message="Loading locations..."/>
    if (error) return <ErrorMessage message={error}/>

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

            {/* Locations Table */}
            <LocationTable locations={filteredLocations}/>
        </div>
    );
};

export default LocationPage;