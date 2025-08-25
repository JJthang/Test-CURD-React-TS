import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Personnel } from '@/types';
import { schema } from './personel.validation';
import Modal from '@/components/shared/Modal/MainModal';
import { defaultValues, genderOptions } from '@/constants';
import { FormInput, FormSelect } from '@/components/shared';

interface PersonnelFormModalProps {
    isOpen: boolean;
    mode: 'add' | 'edit';
    initialValues?: Personnel;
    onClose: () => void;
    idLoading: boolean,
    onSubmit: (data: Personnel) => Promise<void>;
}

const PersonnelFormModal: React.FC<PersonnelFormModalProps> = ({
    isOpen,
    mode,
    initialValues,
    idLoading,
    onClose,
    onSubmit,
}) => {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset
    } = useForm<Personnel>({
        resolver: yupResolver(schema),
        defaultValues,
    });

    useEffect(() => {
        if (isOpen) {
            reset(initialValues || defaultValues);
        } else {
            reset(defaultValues);
        }
    }, [isOpen, initialValues, reset]);

    const handleFormSubmit = handleSubmit(async (data) => {
        try {
            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
        }
    });

    const handleClose = () => {
        reset(defaultValues);
        onClose();
    };

    return (
        <Modal hasClose={handleClose} isOpen={isOpen}>
            <div className="">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {mode === 'add' ? 'Add New Personnel' : 'Edit Personnel'}
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <FormInput
                        label="Full Name"
                        name="name"
                        placeholder="Enter full name"
                        control={control}
                        error={errors.name}
                    />

                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        control={control}
                        error={errors.email}
                    />

                    <FormInput
                        label="Address"
                        name="address"
                        placeholder="Enter address"
                        control={control}
                        error={errors.address}
                    />

                    <FormInput
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        placeholder="Select date of birth"
                        control={control}
                        error={errors.dateOfBirth}
                    />

                    <FormSelect
                        label="Gender"
                        name="gender"
                        control={control}
                        error={errors.gender}
                        placeholder="Select gender"
                        options={genderOptions}
                    />

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-1/2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 gap-2 bg-blue-600 px-0! hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                        >
                            {idLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                            <span className='text-base'>{isSubmitting
                                ? (mode === 'add' ? 'Adding...' : 'Updating...')
                                : (mode === 'add' ? 'Add Personnel' : 'Update Personnel')
                            }</span>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PersonnelFormModal;