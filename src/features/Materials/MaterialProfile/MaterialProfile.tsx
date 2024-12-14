import {useParams} from "react-router-dom";
import {useFetchMaterialById} from "../../../hooks/useFetchMaterials.ts";
import UpdateMaterialForm from "./components/EditMaterialForm.tsx";
import {deleteMaterial} from "../../../services/material.services.ts";
import {ErrorMessage, LoadingMessage} from "../../../components/layout/Message.tsx";
import InventoryTable from "./components/InventoryTable.tsx";
import Dialog from "../../../components/layout/Dialog.tsx";
import {useState} from "react";
import Panel from "../../../components/layout/Panel.tsx";
import MaterialProfileInfo from "./components/MaterialProfileInfo.tsx";
import {FaIcons} from "react-icons/fa6";
import {FaRemoveFormat} from "react-icons/fa";
import PrimaryButton from "../../../components/common/PrimaryButton.tsx";
import LinkHierarchy from "../../../components/layout/LinkHierarchy.tsx";
import CreateInventoryForm from "./components/CreateInventoryForm.tsx";

const MaterialProfile = () => {
    const {id} = useParams<{ id: string }>();
    const materialId = Number(id);
    const {material, error, loading} = useFetchMaterialById(materialId);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showInventoryDialog, setShowInventoryDialog] = useState<boolean>(false);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    const toggleInventoryDialog = () => {
        setShowInventoryDialog(!showInventoryDialog);
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

            <LinkHierarchy />

            {/* Action Buttons inside Profile Card */}
            <div className="action-buttons">
                <PrimaryButton onClick={toggleDialog} label="Update Material" Icon={FaIcons}/>
                <PrimaryButton onClick={toggleInventoryDialog} label="Add Inventory" Icon={FaIcons}/>
                <PrimaryButton onClick={handleDeleteMaterial} label="Delete Material" Icon={FaRemoveFormat} confirmationMessage={`Are you sure you want to remove ${material.name}?`}/>
            </div>

            {/* Material Profile Card */}
            <MaterialProfileInfo material={material}/>

            <Dialog
                element={<UpdateMaterialForm material={material}/>}
                heading="Update Material"
                isOpen={showDialog}
                toggle={toggleDialog}
            />

            <Dialog
                element={<CreateInventoryForm materialId={material.id}/>}
                heading="Add Inventory"
                isOpen={showInventoryDialog}
                toggle={toggleInventoryDialog}
            />

            <Panel
                heading="Inventory"
                element={<InventoryTable materialId={material.id}/>}
            />
        </div>
    );
}

export default MaterialProfile;