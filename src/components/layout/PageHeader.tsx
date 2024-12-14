import React from 'react';
import PrimaryButton from '../common/PrimaryButton.tsx';
import {IconType} from "react-icons";

interface PageHeaderProps {
    title: string;
    buttonLabel: string;
    buttonIcon: IconType;
    onButtonClick: () => void;
    count?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   buttonLabel,
                                                   buttonIcon: ButtonIcon,
                                                   onButtonClick,
                                                   count
                                               }) => {
    return (
        <header className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between gap-2 w-full">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <span>{title}</span>
                    <span className="text-base lg:text-lg font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-md">
                        {count}
                    </span>
                </h1>
                <PrimaryButton
                    onClick={onButtonClick}
                    label={buttonLabel}
                    Icon={ButtonIcon}
                    className=""
                />
            </div>
        </header>
    );
};

export default PageHeader;