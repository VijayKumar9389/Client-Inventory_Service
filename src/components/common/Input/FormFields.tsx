import React from 'react';

// TextAreaField.tsx
interface TextAreaFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, id, name, value, onChange, required = false }) => (
    <div className="form-field-wrapper">
        <label htmlFor={id} className="form-label">{label}</label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="form-textarea"
            required={required}
        />
    </div>
);

// InputField.tsx
interface InputFieldProps {
    label: string;
    id: string;
    name: string;
    value: string | number ;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'email' | 'password';
    required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, name, value, onChange, type = 'text', required = false }) => (
    <div className="form-field-wrapper">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="form-input"
            required={required}
        />
    </div>
);

// DropdownListField.tsx
interface DropdownListFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    options: { label: string; value: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

export const DropdownListField: React.FC<DropdownListFieldProps> = ({
                                                                        label,
                                                                        id,
                                                                        name,
                                                                        value,
                                                                        options,
                                                                        onChange,
                                                                        required = false,
                                                                    }) => (
    <div className="form-field-wrapper">
        <label htmlFor={id} className="form-label">{label}</label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="form-input"
            required={required}
        >
            <option value="">Select an option</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

// FileUploadField.tsx
interface FileUploadFieldProps {
    label: string;
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    accept?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
                                                                    label,
                                                                    id,
                                                                    name,
                                                                    onChange,
                                                                    required = false,
                                                                    accept = 'image/*',
                                                                }) => (
    <div className="form-field-wrapper">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
            type="file"
            id={id}
            name={name}
            onChange={onChange}
            className="form-input"
            required={required}
            accept={accept}
        />
    </div>
);

// DateSelectorField.tsx
interface DateSelectorFieldProps {
    label: string;
    id: string;
    name: string;
    value: string | Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export const DateSelectorField: React.FC<DateSelectorFieldProps> = ({
                                                                        label,
                                                                        id,
                                                                        name,
                                                                        value,
                                                                        onChange,
                                                                        required = false,
                                                                    }) => (
    <div className="form-field-wrapper">
        <label htmlFor={id} className="form-label">{label}</label>
        <input
            type="date"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className="form-input"
            required={required}
        />
    </div>
);

