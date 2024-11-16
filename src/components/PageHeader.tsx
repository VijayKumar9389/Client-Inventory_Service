import React, {ChangeEvent, useState} from 'react';
import PrimaryButton from './PrimaryButton';
import {BiSearch, BiX} from 'react-icons/bi';
import {IconType} from "react-icons";

interface PageHeaderProps {
    title: string;
    buttonLabel: string;
    buttonIcon: IconType;
    onButtonClick: () => void;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   buttonLabel,
                                                   buttonIcon: ButtonIcon,
                                                   onButtonClick,
                                                   value,
                                                   onChange,
                                                   placeholder,
                                               }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleClear = () => {
        setInputValue('');
        onChange('');
    };

    return (
        <header className="flex flex-col gap-4 px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            <div className="flex items-center gap-2 w-full">
                <div className="flex items-center gap-2 border border-gray-300 rounded-md shadow-sm w-full">
                    <button
                        onClick={inputValue ? handleClear : undefined}
                        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-md"
                    >
                        {inputValue ? <BiX size={20} /> : <BiSearch size={20} />}
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full text-gray-700 focus:outline-none rounded-r-md"
                    />
                </div>
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