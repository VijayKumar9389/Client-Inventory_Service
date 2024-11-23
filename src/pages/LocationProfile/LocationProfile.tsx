import {useNavigate, useParams} from 'react-router-dom';
import {useFetchLocationById} from '../../hooks/useFetchLocations';
import {ErrorMessage, LoadingMessage} from '../../components/Message';
import UpdateLocationForm from './components/UpdateLocationForm';
import {deleteLocation} from '../../services/location.services';
import {getToolsByLocation} from '../../services/tool.services';
import {useEffect, useState} from 'react';
import {ToolDTO} from "../../models/tool.models.ts";
import LocationToolsTable from "./components/LocationToolsTable.tsx";
import LocationMaterialTable from "./components/LocationInventoryTable.tsx";
import Dialog from "../../components/Dialog.tsx";
import Panel from "../../components/Panel.tsx";
import LocationProfileInfo from "./components/LocationProfileInfo.tsx";
import ProfileButton from "../../components/ProfileButton.tsx";
import {GrUpdate} from "react-icons/gr";
import {RiDeleteBin2Fill} from "react-icons/ri";

const LocationProfile = () => {
    const {id} = useParams<{ id: string }>();
    const locationId = Number(id);
    const navigate = useNavigate();
    const {location, loading, error} = useFetchLocationById(locationId);
    const [tools, setTools] = useState<ToolDTO[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDialog = () => setIsDialogOpen((prev) => !prev);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const toolsData = await getToolsByLocation(locationId);
                setTools(toolsData);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        fetchTools();
    }, [locationId]);

    const handleDeleteLocation = async (locationId: number) => {
        try {
            await deleteLocation(locationId);
            navigate(-1);
        } catch (err) {
            console.error('Error deleting location:', err);
        }
    };

    if (loading) return <LoadingMessage message="Loading location..."/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!location) return <ErrorMessage message="Location not found"/>;

    return (
        <div className="profile-container">
            <LocationProfileInfo location={location}/>

            <div className="action-buttons">
                <ProfileButton onClick={toggleDialog} label="Update Location" Icon={GrUpdate}/>
                <ProfileButton onClick={() => handleDeleteLocation(locationId)} label="Delete Tool" Icon={RiDeleteBin2Fill}/>
            </div>

            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<UpdateLocationForm location={location}/>}
                heading="Update Location"
            />
            <Panel heading="Location Tools" element={<LocationToolsTable tools={tools}/>}/>
            <Panel heading="Location Inventory" element={<LocationMaterialTable materialId={locationId}/>}/>
        </div>
    );
};

export default LocationProfile;