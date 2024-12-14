import {useNavigate, useParams} from 'react-router-dom';
import {useFetchSiteWithLocations} from '../../../hooks/location.hooks.ts';
import {ErrorMessage, LoadingMessage} from '../../../components/layout/Message.tsx';
import {deleteLocation} from '../../../services/location.services.ts';
import {getToolsByLocation} from '../../../services/tool.services.ts';
import {useEffect, useState} from 'react';
import {ToolDTO} from "../../../models/tool.models.ts";
import LocationToolsTable from "./components/LocationToolsTable.tsx";
import LocationMaterialTable from "./components/LocationInventoryTable.tsx";
import Panel from "../../../components/layout/Panel.tsx";
import {GrUpdate} from "react-icons/gr";
import {RiDeleteBin2Fill} from "react-icons/ri";
import PrimaryButton from "../../../components/common/PrimaryButton.tsx";
import CreateLocationForm from "./components/CreateLocationForm.tsx";
import LocationList from "./components/LocationList.tsx";
import LocationTable from "./components/LocationTable.tsx";
import RenderView from "../../../components/layout/RenderView.tsx";
import Dialog from "../../../components/layout/Dialog.tsx";
import {FaPlus} from "react-icons/fa6";
import UpdateSite from "./components/UpdateSiteFom.tsx";
import LinkHierarchy from "../../../components/layout/LinkHierarchy.tsx";
import SiteProfileInfo from "./components/SiteProfileInfo.tsx";

const SiteProfile = () => {
    const {id} = useParams<{ id: string }>();
    const siteId = Number(id);
    const navigate = useNavigate();
    const {site, loading, error} = useFetchSiteWithLocations(siteId);
    const [tools, setTools] = useState<ToolDTO[]>([]);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [isCreateLocationFormOpen, setIsCreateLocationFormOpen] = useState(false);

    const toggleCreateLocationForm = () => setIsCreateLocationFormOpen((prev) => !prev);

    const toggleUpdateForm = () => setIsUpdateFormOpen((prev) => !prev);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const toolsData = await getToolsByLocation(siteId);
                setTools(toolsData);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        fetchTools();
    }, [siteId]);

    const handleDeleteLocation = async (locationId: number) => {
        try {
            await deleteLocation(locationId);
            navigate(-1);
        } catch (err) {
            console.error('Error deleting location:', err);
        }
    };

    if (loading) return <LoadingMessage message="Loading Site..."/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!site) return <ErrorMessage message="Site not found"/>;
    if (!site.locations) return <ErrorMessage message="No locations found for this site"/>;

    return (
        <div className="profile-container">

            <LinkHierarchy/>

            <div className="action-buttons">
                <PrimaryButton onClick={toggleUpdateForm} label="Update Site" Icon={GrUpdate}/>
                <PrimaryButton onClick={toggleCreateLocationForm} label="Create Location" Icon={FaPlus}/>
                <PrimaryButton onClick={() => handleDeleteLocation(siteId)} label="Delete Tool"
                               Icon={RiDeleteBin2Fill}
                               confirmationMessage={`Are you sure you want to remove ${site.name}`}/>
            </div>

            <SiteProfileInfo site={site}/>

            <Dialog
                isOpen={isCreateLocationFormOpen}
                toggle={toggleCreateLocationForm}
                element={<CreateLocationForm siteId={siteId}/>}
                heading="Create Location"
            />

            <Dialog
                isOpen={isUpdateFormOpen}
                toggle={toggleUpdateForm}
                element={<UpdateSite site={site}/>}
                heading="Update Site"
            />

            <Panel
                heading="Locations"
                element={
                    <RenderView
                        loading={loading}
                        error={error}
                        listComponent={<LocationList locations={site.locations}/>}
                        tableComponent={<LocationTable locations={site.locations}/>}
                    />
                }
            />

            <Panel heading="Location Tools" element={<LocationToolsTable tools={tools}/>}/>
            <Panel heading="Location Inventory" element={<LocationMaterialTable materialId={siteId}/>}/>
        </div>
    );
};

export default SiteProfile;