"use client";

export const TextInput = ({
    label,
    placeholder,
    onChange}: {
    label: string;
    placeholder: string;
    onChange: (value: string) => void;
}) => {
    return (
        <div className="flex flex-col">
            <label className="text-left text-sm text-gray-500">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mt-1 text-gray-700"
            />
        </div>
    );
}