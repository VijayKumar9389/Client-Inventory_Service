import CreateMaterialForm from "./components/CreateMaterialForm.tsx";
import MaterialList from "./components/MaterialList.tsx";
import Dialog from "../../../components/layout/Dialog.tsx";
import {useState} from "react";
import PageHeader from "../../../components/layout/PageHeader.tsx";
import { FaPlus} from "react-icons/fa6";
import {useFetchMaterials} from "../../../hooks/useFetchMaterials.ts";
import MaterialFilter from "./components/MaterialFilter.tsx";
import MaterialTable from "./components/MaterialTable.tsx";
import RenderView from "../../../components/layout/RenderView.tsx";

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
            <RenderView
                loading={loading}
                error={error}
                listComponent={<MaterialList materials={filteredMaterials} />}
                tableComponent={<MaterialTable materials={filteredMaterials} />}
            />

        </div>
    );
}

export default MaterialPage;