import { ToolDTO } from "../../../../models/tool.models.ts";
import ImageWithAlt from "../../../../components/common/ImageWithAlt.tsx";

const LocationToolsTable = ({ tools }: { tools: ToolDTO[] }) => {
    return (
        <div className="list-container">
            {tools.map((tool: ToolDTO) => (
                <div
                    key={tool.id}
                    className="card-container"
                    tabIndex={0} // Makes it focusable for accessibility
                >
                    {tool.imageUrl ? (
                        <div className="card-image">
                            <ImageWithAlt
                                imageName={tool.imageUrl}
                                className="card-image"
                            />
                        </div>
                    ) : (
                        <div className="card-image">
                            <p className="card-subtext">No image</p>
                        </div>
                    )}
                    <div className="card-details">
                        <h3 className="card-title">{tool.name}</h3>
                        <div className="card-grid">
                            <div>
                                <span className="card-label">Serial Number:</span>
                                <p className="card-value">{tool.serialNumber || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="card-label">Cost:</span>
                                <p className="card-value">{tool.cost || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="card-label">Category:</span>
                                <p className="card-value">{tool.categoryId || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="card-label">Status:</span>
                                <p className="card-value">{tool.status || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LocationToolsTable;