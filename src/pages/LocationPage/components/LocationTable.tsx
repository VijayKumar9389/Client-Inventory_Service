// LocationTable.tsx
import {useFetchLocations} from '../../../hooks/useFetchLocations.ts';
import LocationRow from "./LocationTableRow.tsx";
import {ErrorMessage, LoadingMessage} from "../../../components/Message.tsx";

export const LocationTable = () => {
    const { locations, error, loading } = useFetchLocations();

    if (loading) return <LoadingMessage message="Loading locations..." />
    if (error) return <ErrorMessage message={error} />

    return (
        <div className="p-4 my-4 overflow-x-auto">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Location Name</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {locations.map(location => (
                        <LocationRow
                            key={location.id}
                            location={location}
                        />
                    ))}
                    </tbody>
                </table>
        </div>
    );
};