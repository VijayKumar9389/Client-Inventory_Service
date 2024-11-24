import {useFetchUserById} from '../../hooks/useFetchUsers';
import {LoadingMessage, ErrorMessage} from '../../components/Message';
import UpdateUserForm from './components/UpdateUserForm.tsx';
import {deleteUser} from '../../services/user.services';
import {useNavigate, useParams} from "react-router-dom";
import Dialog from "../../components/Dialog.tsx";
import {useState} from "react";
import UserProfileInfo from "./components/UserProfileInfo.tsx";
import {GrUpdate} from "react-icons/gr";
import {RiDeleteBin2Fill} from "react-icons/ri";
import PrimaryButton from "../../components/PrimaryButton.tsx";
import {MdArrowBack} from "react-icons/md";

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

            <div className="action-buttons">
                <PrimaryButton onClick={() => window.history.back()} label="Back" Icon={MdArrowBack}/>
                <PrimaryButton onClick={toggleDialog} label="Update User" Icon={GrUpdate}/>
                <PrimaryButton onClick={handleDeleteUser} label="Delete User" Icon={RiDeleteBin2Fill}/>
            </div>

            <UserProfileInfo user={user}/>

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