import { ToolDTO } from "../../../models/tool.models.ts";
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";

const LocationToolsTable = ({ tools }: { tools: ToolDTO[] }) => {
    return (
        <table className="button-table">
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Serial Number</th>
                <th>Cost</th>
                <th>Category</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {tools.map((tool: ToolDTO) => (
                <tr key={tool.id}>
                    <td>
                        <ImageWithAlt
                            imageName={tool.imageUrl || ''}
                            className="image-square" // Custom class for the image
                        />
                    </td>
                    <td>{tool.name}</td>
                    <td>{tool.serialNumber}</td>
                    <td>{tool.cost}</td>
                    <td>{tool.categoryId}</td>
                    <td>{tool.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default LocationToolsTable;