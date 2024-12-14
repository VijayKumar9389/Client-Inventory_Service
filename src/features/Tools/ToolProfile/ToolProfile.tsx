import {useParams} from 'react-router-dom';
import {useFetchToolById} from '../../../hooks/useFetchTools.ts';
import {ErrorMessage, LoadingMessage} from '../../../components/layout/Message.tsx';
import UpdateToolForm from './components/UpdateToolForm.tsx';
import {deleteTool} from '../../../services/tool.services.ts';
import RelatedTools from './components/RelatedTools.tsx';
import Panel from "../../../components/layout/Panel.tsx";
import Dialog from "../../../components/layout/Dialog.tsx";
import {useState} from "react";
import ToolInfo from "./components/ToolProfileInfo.tsx";
import PrimaryButton from "../../../components/common/PrimaryButton.tsx";
import {GrUpdate} from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import {TbTransfer} from "react-icons/tb";
import LinkHierarchy from "../../../components/layout/LinkHierarchy.tsx";

const ToolProfile = () => {
    const {id} = useParams<{ id: string }>();
    const itemId = Number(id);
    const {item, loading, error} = useFetchToolById(itemId);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    const handleDeleteTool = async () => {
        if (item) {
            try {
                await deleteTool(item.id);
                window.location.href = '/tools';
            } catch (err) {
                console.error('Error deleting tool:', err);
                alert('Failed to delete tool. Please try again.');
            }
        }
    };

    if (loading) return <LoadingMessage message="Loading item..."/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!item) return <ErrorMessage message="Item not found"/>;

    return (
        <div className="profile-container">
            <LinkHierarchy/>

            {/* Page Buttons */}
            <div className="action-buttons">
                <PrimaryButton onClick={toggleDialog} label="Update Tool" Icon={GrUpdate}/>
                <PrimaryButton onClick={() => window.alert("feature not ready")} label="Transfer Item"
                               Icon={TbTransfer}/>
                <PrimaryButton onClick={handleDeleteTool} label="Delete Tool" Icon={MdDelete} confirmationMessage={`Are you sure you want to remove ${item.name}`}/>
            </div>

            {/* Item Info */}
            <ToolInfo item={item}/>

            <Dialog
                element={<UpdateToolForm tool={item}/>}
                heading="Update Tool"
                isOpen={showDialog}
                toggle={toggleDialog}
            />

            <Panel
                element={<RelatedTools categoryId={item.categoryId || null} itemId={item.id}/>}
                heading="Related Tools"
            />

        </div>
    );
};

export default ToolProfile;