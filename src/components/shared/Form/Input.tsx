import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
    type FieldError,
} from 'react-hook-form';


interface IfInput<T extends FieldValues = FieldValues> {
    label?: string;
    name: Path<T>;
    type?: string;
    placeholder?: string;
    control: Control<T>;
    error?: FieldError;
    className?: string;
}

export const FormInput = <T extends FieldValues>({
    label,
    name,
    type = 'text',
    placeholder,
    control,
    error,
    className = '',
    ...props
}: IfInput<T>) => {
    return (
        <div className="mb-2">
            {label && (
                <label
                    className={'block text-sm font-bold text-gray-700 mb-1'}
                >
                    {label}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        className={`
              w-full px-3 py-2 border rounded-lg shadow-sm  focus:ring-blue-500 focus:border-blue-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${className}
            `}
                        {...props}
                    />
                )}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

