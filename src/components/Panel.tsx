import React from 'react';

const Panel: React.FC<{ element: JSX.Element; heading: string }> = ({ element, heading }) => {
    return (
        <div className="mx-auto w-full p-6 bg-white rounded-lg shadow-md">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h3 className="font-semibold text-xl text-gray-900 tracking-tight">{heading}</h3>
            </div>

            {/* Content Section */}
            <div className="text-gray-800 leading-relaxed space-y-4">
                {element}
            </div>
        </div>
    );
};

export default Panel;