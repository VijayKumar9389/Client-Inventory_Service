import MaterialCard from "./MaterialCard.tsx";
import React from "react";
import {MaterialWithInventoryDTO} from "../../../../models/material.models.ts";

const MaterialList: React.FC<{materials: MaterialWithInventoryDTO[]}> = ({materials}) => {

    return (
        <div className="list-container">
            {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
            ))}
        </div>
    );
};

export default MaterialList;