import CreateMaterialForm from "./components/CreateMaterialForm.tsx";
import MaterialList from "./components/MaterialList/MaterialList.tsx";
import Dialog from "../../components/Dialog.tsx";
import {useState} from "react";
import PageHeader from "../../components/PageHeader.tsx";
import { FaPlus} from "react-icons/fa6";
import {useFetchMaterials} from "../../hooks/useFetchMaterials.ts";
import {ErrorMessage} from "../../components/Message.tsx";
import MaterialFilter from "./components/MaterialFilter.tsx";

const MaterialPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for managing dialog
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const { materials, loading, error } = useFetchMaterials();

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    // Toggles dialog open/close state
    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    // Filter materials based on search term
    const filteredMaterials = materials.filter(material => {
        return material.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="page-container">
            <PageHeader
                title="Materials"
                buttonLabel="Add Material"
                onButtonClick={toggleDialog}
                buttonIcon={FaPlus}
                count={materials.length}
            />
            <MaterialFilter value={searchTerm} onChange={handleSearch} placeholder="Search materials..." />
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateMaterialForm />}
                heading="Add Material"
            />
            {/* Conditionally render Material List or error */}
            {error ? (
                <ErrorMessage message="Error retrieving locations" />
            ) : (
                <MaterialList materials={filteredMaterials} loading={loading}/>
            )}
        </div>
    );
}

export default MaterialPage;