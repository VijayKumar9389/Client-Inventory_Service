import { useNavigate } from 'react-router-dom';
import { MaterialDTO } from '../../../models/material.models.ts';
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";

interface MaterialRowProps {
    material: MaterialDTO;
}

const MaterialTableRow = ({ material }: MaterialRowProps) => {
    const navigate = useNavigate();

    const goToMaterialDetail = () => {
        navigate(`/materials/${material.id}`);
    };

    return (
        <tr onClick={goToMaterialDetail} className="cursor-pointer hover:bg-gray-100">
            <td> {/* Image cell with fixed size */}
                <ImageWithAlt
                    imageName={material.imageUrl || ''}
                    className="image-square" // Custom class for the image
                />
            </td>
            <td>{material.name}</td>
            <td>{material.categoryId || 'N/A'}</td>
            <td>{material.costPerUnit}</td>
        </tr>
    );
};

export default MaterialTableRow;