import React from "react";
import {FaTape} from "react-icons/fa6";
import {ErrorMessage} from "../../../../components/layout/Message.tsx";
import {MaterialWithInventoryDTO} from "../../../../models/material.models.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";
import {calculateTotalMaterialQuantity} from "../../../../utils/calc.utils.ts";
import {Navigate} from "../../../../utils/navigation.utils.ts";

interface MaterialListProps {
    materials: MaterialWithInventoryDTO[];
}

const MaterialTable: React.FC<MaterialListProps> = ({materials}) => {

    const nav = Navigate();

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Material</th>
                    <th>Cost per Unit</th>
                    <th>Available</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {materials.length ? (
                    materials.map((material) => {
                        return (
                            <tr key={material.id} onClick={() => nav.goToMaterialProfile(material.id)}>
                                <td>
                                    <ImageWithAlt
                                        imageName={material.imageUrl || ""}
                                        altIcon={FaTape}
                                        className="image-square"
                                    />
                                </td>
                                <td>{material.name}</td>
                                <td>${material.costPerUnit}</td>
                                <td>
                                    {material.inventory && material.inventory.length > 0
                                        ? calculateTotalMaterialQuantity(material)
                                        : "None"}
                                </td>
                                <td>{material.category?.name || "Uncategorized"}</td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={5} className="no-materials">
                            <ErrorMessage message="No materials found."/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialTable;