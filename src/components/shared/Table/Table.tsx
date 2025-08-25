
import React, { useState, useMemo, type JSX } from 'react';
import { Edit2, Trash2, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import type { CommonTableProps, ifSortConfig, TableColumn } from '@/types';
import { formatDate } from '@/utils/formatDate';

export const CommonTable = <T extends { id: string | number }>({
    data,
    columns,
    onEdit = () => { },
    onDelete = () => { },
    emptyMessage = 'No data found'
}: CommonTableProps<T>): JSX.Element => {
    const [sortConfig, setSortConfig] = useState<ifSortConfig>({ key: null, direction: 'asc' });

    const sortedData = useMemo((): T[] => {

        if (!sortConfig.key) return data;

        return [...data].sort((a: T, b: T) => {
            const aValue = a[sortConfig.key as keyof T];
            const bValue = b[sortConfig.key as keyof T];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue, 'vi', {
                    numeric: true,
                    sensitivity: 'base'
                });
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const handleSort = (key: string): void => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey: string): JSX.Element => {
        if (sortConfig.key !== columnKey) {
            return <Minus className="w-3 h-3 text-gray-400" />;
        }
        return sortConfig.direction === 'asc' ?
            <ChevronUp className="w-3 h-3" /> :
            <ChevronDown className="w-3 h-3" />;
    };

    const renderCellValue = (item: T, column: TableColumn<T>): React.ReactNode => {
        const value = item[column.key];
        if (column.render) {
            return column.render(value, item);
        }
        if (column.type === 'date' && value) {
            return formatDate(value as string);
        }
        return value as React.ReactNode;
    };

    return (
        <div className="flex-1 overflow-auto">
            <table className="w-full h-full" >
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        {columns.map((column: TableColumn<T>) => (
                            <th
                                key={column.key as string}
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                    }`}
                                onClick={column.sortable ? () => handleSort(column.key as string) : undefined}
                            >
                                <div className="flex items-center gap-1">
                                    {column.title}
                                    {column.sortable && getSortIcon(column.key as string)}
                                </div>
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 flex-1">
                    {!sortedData.length ? (
                        <tr className='flex-1'>
                            <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((item: T) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                {columns.map((column: TableColumn<T>) => (
                                    <td
                                        key={column.key as string}
                                        className={`px-6 py-4 text-sm ${column.className || 'text-gray-600'} ${column.truncate ? 'max-w-xs truncate' : 'whitespace-nowrap'
                                            }`}
                                    >
                                        {renderCellValue(item, column)}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-blue-600 hover:text-blue-800 p-1"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id as string)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                            title="Xóa"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table >
        </div >
    );
};
