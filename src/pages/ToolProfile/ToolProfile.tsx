import {useParams} from 'react-router-dom';
import {useFetchToolById} from '../../hooks/useFetchTools';
import {ErrorMessage, LoadingMessage} from '../../components/Message';
import UpdateToolForm from './components/UpdateToolForm';
import {deleteTool} from '../../services/tool.services';
import RelatedTools from './components/RelatedTools';
import RelatedMaterials from './components/RelatedMaterials';
import Panel from "../../components/Panel.tsx";
import Dialog from "../../components/Dialog.tsx";
import {useState} from "react";
import ToolInfo from "./components/ToolProfileInfo.tsx";
import ProfileButton from "../../components/ProfileButton.tsx";
import {FaIcons} from "react-icons/fa6";
import {FaRemoveFormat} from "react-icons/fa";

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
            {/* Item Info */}
            <ToolInfo item={item}/>

            {/* Page Buttons */}
            <div className="action-buttons">
                <ProfileButton onClick={toggleDialog} label="Update Tool" Icon={FaIcons}/>
                <ProfileButton onClick={handleDeleteTool} label="Delete Tool" Icon={FaRemoveFormat}/>
                <ProfileButton onClick={() => {}} label="Transfer Item" Icon={FaRemoveFormat}/>
            </div>

            <Dialog
                element={<UpdateToolForm tool={item}/>}
                heading="Update Tool"
                isOpen={showDialog}
                toggle={toggleDialog}
            />

            {item.categoryId && (
                <>
                    <Panel
                        element={<RelatedTools categoryId={item.categoryId} itemId={item.id}/>}
                           heading="Related Tools"
                    />
                    <Panel
                        element={<RelatedMaterials
                        categoryId={item.categoryId}/>}
                        heading="Related Materials"
                    />
                </>
            )}
        </div>
    );
};

export default ToolProfile;