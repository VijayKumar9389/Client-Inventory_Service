import MaterialCard from "./MaterialCard.tsx";
import React from "react";
import {MaterialWithInventoryDTO} from "../../../../models/material.models.ts";
import {ErrorMessage, LoadingMessage} from "../../../../components/Message.tsx";

const MaterialList: React.FC<{ materials: MaterialWithInventoryDTO[], loading: boolean }> = ({materials, loading}) => {
    if (loading) return <LoadingMessage message="Loading materials..."/>;

    return (
        <div className="list-container">
            {materials.length ? (
                materials.map((material) => (
                    <MaterialCard key={material.id} material={material}/>
                ))
            ) : (
                <ErrorMessage message="No materials found."/>
            )}
        </div>
    );
};

export default MaterialList;