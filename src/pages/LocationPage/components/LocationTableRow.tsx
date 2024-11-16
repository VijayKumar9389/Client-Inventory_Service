import { Location } from '../../../models/location.models.ts';
import React from "react";
import {useNavigate} from "react-router-dom";

const LocationRow: React.FC<{location: Location}> = ({location}) => {
    const navigate = useNavigate();

    const goToLocationDetail = () => {
        navigate(`/locations/${location.id}`);
    }

    return (
        <tr onClick={goToLocationDetail}>
            <td>{location.name}</td>
            <td>{location.address}</td>
        </tr>
    );
};

export default LocationRow;