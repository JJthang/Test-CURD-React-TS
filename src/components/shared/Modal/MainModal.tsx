
import React from 'react';
import { X } from 'lucide-react';
import { handleOverlayClick } from '@/utils';

type Props = {
    isOpen: boolean,
    submitForm?: () => void
    hasClose: () => void
    children?: React.ReactNode
}

const Modal: React.FC<Props> = ({ isOpen, hasClose, children }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm transition-all duration-300 ease-out ${isOpen
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
                }`}
            onClick={(e) => handleOverlayClick(e, hasClose)}
        >
            <div
                className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 ease-out ${isOpen
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-90 opacity-0 translate-y-8'
                    }`}
            >
                <div className="p-6">
                    <div className="space-y-4">
                        {children}
                    </div>
                </div>
                <X
                    onClick={hasClose}
                    className="absolute top-3 right-3 size-7 cursor-pointer hover:bg-gray-100 hover:text-gray-700 rounded-full p-1 transition-colors duration-200"
                />
            </div>
        </div>
    );
};
export default Modal