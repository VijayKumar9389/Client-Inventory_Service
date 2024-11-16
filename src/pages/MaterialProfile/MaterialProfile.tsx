import {useParams} from "react-router-dom";
import {useFetchMaterialById} from "../../hooks/useFetchMaterials.ts";
import UpdateMaterialForm from "./components/EditMaterialForm.tsx";
import {deleteMaterial} from "../../services/material.services.ts";
import ConfirmationButton from "../../components/ConfirmationButton.tsx";
import {ErrorMessage, LoadingMessage} from "../../components/Message.tsx";
import InventoryTable from "./components/InventoryTable.tsx";
import Dialog from "../../components/Dialog.tsx";
import {useState} from "react";
import PrimaryButton from "../../components/PrimaryButton.tsx";
import Panel from "../../components/Panel.tsx";
import MaterialProfileInfo from "./components/MaterialProfileInfo.tsx";

const MaterialProfile = () => {
    const {id} = useParams<{ id: string }>();
    const materialId = Number(id);
    const {material, error, loading} = useFetchMaterialById(materialId);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    const handleDeleteMaterial = async () => {
        if (material) {
            try {
                await deleteMaterial(material.id);
                window.location.href = "/materials";
            } catch (err) {
                console.error("Error deleting material:", err);
                alert("Failed to delete material. Please try again.");
            }
        }
    }

    if (loading) return <LoadingMessage message="Loading material..."/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!material) return <ErrorMessage message="Material not found"/>;

    return (
        <div className="profile-container">
            {/* Material Profile Card */}

            <MaterialProfileInfo material={material}/>


            {/* Action Buttons inside Profile Card */}
            <div className="action-buttons">
                <ConfirmationButton
                    confirmationMessage="Are you sure you want to remove this material?"
                    onConfirm={() => handleDeleteMaterial()}
                    buttonText="Delete Material"
                />
                <PrimaryButton onClick={toggleDialog} label="Update Material"/>
            </div>

            <Dialog
                element={<UpdateMaterialForm material={material}/>}
                heading="Update Material"
                isOpen={showDialog}
                toggle={toggleDialog}
            />

            <Panel
                heading="Inventory"
                element={<InventoryTable materialId={material.id}/>}
            />
        </div>
    );
}

export default MaterialProfile;