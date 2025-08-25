import React, { memo } from 'react'
import type { Personnel } from '@/types'
import { employeeColumns } from '@/constants'
import { CommonTable } from '@/components/shared'

type Props = {
    data: Personnel[]
    onEdit: (e: Personnel) => void
    onDelete: (e: string) => void
}

export const ListPersonnelComponent: React.FC<Props> = ({ data, onEdit, onDelete }) => {

    return (
        <>
            <div className='flex-1 p-4 overflow-hidden'>
                <div className='bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col'>
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                        <h2 className="text-lg font-semibold text-gray-800">User list</h2>
                    </div>
                    <CommonTable
                        data={data}
                        columns={employeeColumns}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        emptyMessage="Not found data"
                    />
                </div>
            </div>
        </>

    )
}

export const ListPersonnel = memo(ListPersonnelComponent)