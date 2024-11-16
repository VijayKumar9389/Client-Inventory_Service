import CreateMaterialForm from "./components/CreateMaterialForm.tsx";
import MaterialTable from "./components/MaterialTable.tsx";
import Dialog from "../../components/Dialog.tsx";
import {useState} from "react";
import PageHeader from "../../components/PageHeader.tsx";
import { FaPlus} from "react-icons/fa6";

const MaterialPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for managing dialog
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

    // Handles search input change
    const handleSearch = (value: string) => setSearchTerm(value);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <div>
            <PageHeader
                title="Materials"
                buttonLabel="Add Material"
                onButtonClick={toggleDialog}
                buttonIcon={FaPlus}
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search materials"
            />
            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<CreateMaterialForm />}
                heading="Add Material"
            />
            <MaterialTable />
        </div>
    );
}

export default MaterialPage;