import {useNavigate} from 'react-router-dom';
import {ToolDTO} from '../../../models/tool.models.ts';
import ImageWithAlt from "../../../components/ImageWithAlt.tsx";

interface ItemRowProps {
    item: ToolDTO;
}

const ItemRow = ({item}: ItemRowProps) => {
    const navigate = useNavigate();

    const goToItemDetail = () => {
        navigate(`/tools/${item.id}`);
    };

    return (
        <tr onClick={goToItemDetail}>
            <td>
                <ImageWithAlt
                    imageName={item.imageUrl || ''}
                    className="image-square" // Custom class for the image
                />
            </td>
            <td>{item.name}</td>
            <td>{item.locationId}</td>
            <td>{item.categoryId || 'None'}</td>
            <td>{item.status}</td>
        </tr>
    );
};

export default ItemRow;