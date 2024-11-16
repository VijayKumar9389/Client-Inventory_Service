import  { useState } from "react";
import { LocationTable} from "./components/LocationTable.tsx";
import CreateLocationForm from "./components/CreateLocationForm.tsx";
import Dialog from "../../components/Dialog.tsx";
import PageHeader from "../../components/PageHeader.tsx";
import { FaPlus} from "react-icons/fa6"; // Import the dialog component

// Main LocationPage component
const LocationPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for managing dialog
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div>
            {/* Header Section */}
            <PageHeader
                title="Locations"
                buttonLabel="Add Location"
                buttonIcon={FaPlus}
                onButtonClick={toggleDialog} // Handle button click
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search locations"
            />

            {/* Dialog for CreateLocationForm */}
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateLocationForm />} // Pass setError to the form
                heading="Add Location"
            />


            {/* Locations Table */}
            <LocationTable  />

        </div>
    );
};

export default LocationPage;