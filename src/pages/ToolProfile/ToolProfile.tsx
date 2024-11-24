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
import PrimaryButton from "../../components/PrimaryButton.tsx";
import {GrUpdate} from "react-icons/gr";
import {MdArrowBack, MdDelete} from "react-icons/md";
import {TbTransfer} from "react-icons/tb";

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

            {/* Page Buttons */}
            <div className="action-buttons">
                <PrimaryButton onClick={() => window.history.back()} label="Back" Icon={MdArrowBack}/>
                <PrimaryButton onClick={toggleDialog} label="Update Tool" Icon={GrUpdate}/>
                <PrimaryButton onClick={() => window.alert("feature not ready")} label="Transfer Item" Icon={TbTransfer}/>
                <PrimaryButton onClick={handleDeleteTool} label="Delete Tool" Icon={MdDelete}/>
            </div>

            {/* Item Info */}
            <ToolInfo item={item}/>

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