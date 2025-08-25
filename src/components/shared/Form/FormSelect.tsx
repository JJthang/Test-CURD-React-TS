import clsx from "clsx";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

interface FormSelectProps<T extends FieldValues = FieldValues> {
    label?: string;
    name: Path<T>;
    control: Control<T>;
    error?: { message?: string };
    options: { value: string; label: string }[];
    className?: string;
    placeholder?: string;
}

export const FormSelect = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    options,
    className,
    placeholder
}: FormSelectProps<T>) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <label className="block mb-1 font-medium">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        className={clsx("w-full border rounded-lg px-3 py-2 focus:outline-none", error ? 'border-red-500' : 'border-gray-300')}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                )
                }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div >
    );
};

