import {useFetchUserById} from '../../hooks/useFetchUsers';
import {LoadingMessage, ErrorMessage} from '../../components/Message';
import UpdateUserForm from './components/UpdateUserForm.tsx';
import {deleteUser} from '../../services/user.services';
import {useNavigate, useParams} from "react-router-dom";
import Dialog from "../../components/Dialog.tsx";
import {useState} from "react";
import UserProfileInfo from "./components/UserProfileInfo.tsx";
import ProfileButton from "../../components/ProfileButton.tsx";
import {GrUpdate} from "react-icons/gr";
import {RiDeleteBin2Fill} from "react-icons/ri";

const UserProfile = () => {
    const {id} = useParams<{ id: string }>();
    const userId = Number(id);
    const navigate = useNavigate();
    const {user, loading, error} = useFetchUserById(userId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDialog = () => setIsDialogOpen((prev) => !prev);

    const handleDeleteUser = async () => {
        try {
            await deleteUser(userId);
            navigate(-1);
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    if (loading) return <LoadingMessage message="Loading user..."/>;
    if (error) return <ErrorMessage message={error}/>;
    if (!user) return <ErrorMessage message="User not found"/>;

    return (
        <div className="profile-container">

            <UserProfileInfo user={user}/>

            <div className="action-buttons">
                <ProfileButton onClick={toggleDialog} label="Update User" Icon={GrUpdate}/>
                <ProfileButton onClick={handleDeleteUser} label="Delete User" Icon={RiDeleteBin2Fill}/>
            </div>

            <Dialog
                isOpen={isDialogOpen}
                toggle={toggleDialog}
                element={<UpdateUserForm user={user}/>}
                heading="Update User"
            />
        </div>
    );
};

export default UserProfile;