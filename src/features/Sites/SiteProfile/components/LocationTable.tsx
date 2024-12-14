import {Location} from "../../../../models/location.models.ts";
import {Navigate} from "../../../../utils/navigation.utils.ts";

const LocationTable: React.FC<{ locations: Location[] }> = ({locations}) => {
    const nav = Navigate();

    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Location Name</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            {locations.map((location, index) => (
                <tr
                    key={location.id}
                    onClick={() => nav.goToSiteProfile(location.id)}
                >
                    <td>{index + 1}</td>
                    <td>{location.name}</td>
                    <td>{location.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LocationTable;