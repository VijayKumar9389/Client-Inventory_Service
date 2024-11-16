import { ErrorMessage, LoadingMessage } from '../../../components/Message.tsx';
import {useFetchMaterials} from "../../../hooks/useFetchMaterials.ts";
import MaterialTableRow from "./MaterialTableRow.tsx";

const MaterialTable = () => {
    const { materials, loading, error } = useFetchMaterials();
    if (loading) return <LoadingMessage message="Loading materials..." />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="p-4 my-4 overflow-x-auto">
            <table className="data-table">
                <thead>
                    <tr>
                        <th></th> {/* Add an image column */}
                        <th>Name</th>
                        <th>Category ID</th>
                        <th>Cost per Unit</th> {/* Added column for Cost per Unit */}
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material) => (
                        <MaterialTableRow key={material.id} material={material} /> // Use MaterialRow for each material
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialTable;