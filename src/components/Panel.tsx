import React from 'react';

const Panel: React.FC<{ element: JSX.Element; heading: string }> = ({ element, heading }) => {
    return (
        <div className="mx-auto mb-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-900">{heading}</h3>
            </div>

            {/* Content Section */}
            <div className="text-gray-800 leading-relaxed space-y-4">
                {element}
            </div>
        </div>
    );
};

export default Panel;