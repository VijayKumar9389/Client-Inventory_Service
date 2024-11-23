import ToolCard from "./ToolCard.tsx";
import React from "react";
import {ToolDTO} from "../../../models/tool.models.ts";
import {ErrorMessage, LoadingMessage} from "../../../components/Message.tsx";

const ToolList: React.FC<{ tools: ToolDTO[], loading: boolean }> = ({tools, loading}) => {
    if (loading) return <LoadingMessage message="Loading tools..."/>;

    return (
        <div className="list-container">
            {tools.length ? (
                tools.map(tool => (
                    <ToolCard key={tool.id} item={tool}/>
                ))
            ) : (
                <ErrorMessage message="No tools found."/>
            )}
        </div>
    );
};

export default ToolList;