import ToolCard from "./ToolCard.tsx";
import React from "react";
import {ToolDTO} from "../../../../models/tool.models.ts";

const ToolList: React.FC<{ tools: ToolDTO[]}> = ({tools}) => {

    return (
        <div className="list-container">
            {tools.map(tool => (
                <ToolCard key={tool.id} tool={tool}/>
            ))}
        </div>
    );
};

export default ToolList;