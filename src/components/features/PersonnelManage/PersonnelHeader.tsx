import React, { memo } from 'react';
import { PlusCircle } from 'lucide-react';

interface PersonnelHeaderProps {
    onAddStaff?: () => void;
}

const PersonnelHeader: React.FC<PersonnelHeaderProps> = ({ onAddStaff }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                User management
            </h1>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4 items-center sm:items-center">
                <button
                    onClick={onAddStaff}
                    className="flex items-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors hover:bg-blue-700"
                >
                    <PlusCircle width={20} height={20} />
                    More staff
                </button>
            </div>
        </div>
    );
};

export default memo(PersonnelHeader);
