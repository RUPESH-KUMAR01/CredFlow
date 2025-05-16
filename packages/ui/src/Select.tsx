"use client";

export const Select = ({
    options,
    onSelect,
}: {
    options: { key: string; value: string }[];
    onSelect: (value: string) => void;
}) => {
    return (
        <select
            onChange={(e) => {
                onSelect(e.target.value);
            }}
            className="border border-gray-300 rounded-md p-2 mt-1 text-gray-700"
        >
            {options.map((option) => (
                <option key={option.key} value={option.value} className="text-gray-700">
                    {option.value}
                </option>
            ))}
        </select>
    );
}