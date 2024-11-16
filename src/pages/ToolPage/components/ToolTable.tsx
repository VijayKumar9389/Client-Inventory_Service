import {useFetchTools} from '../../../hooks/useFetchTools.ts';
import ItemRow from './ToolTableRow.tsx';
import { ErrorMessage, LoadingMessage } from '../../../components/Message.tsx';

export const ToolTable = () => {
    const { items, error, loading } = useFetchTools();

    if (loading) return <LoadingMessage message="Loading items..." />;

    return (
        <div className="p-4 my-4 overflow-x-auto">
            {error ? (
                <ErrorMessage message={error} />
            ) : (
                <table className="data-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <ItemRow key={item.id} item={item} />
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};