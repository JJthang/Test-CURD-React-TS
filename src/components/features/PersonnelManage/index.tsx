import { useCallback, useState } from 'react';
import type { Personnel } from '@/types';
import { useSetQuery } from '@/hooks/useQuery';
import { ListPersonnel } from './ListPersonnel';
import PersonnelHeader from './PersonnelHeader';
import { personnelApi } from '@/apis/personnel.api';
import PersonnelFormModal from './PersonnelFormModal';
import { DeleteConfirmModal } from '@/components/shared';
import { usePersonnelList } from '@/services/personnel.service';

const PersonnelManage = () => {
    const [isFormOpen, setIsFormOpen] = useState({
        update: false,
        delete: false,
    });
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | undefined>();
    const [acLoading, setAcLoading] = useState(false);

    const { setQuery, getQuery } = useSetQuery();
    const { data, setState } = usePersonnelList();


    const openModal = useCallback((mode: 'add' | 'edit', personnel?: Personnel) => {
        setMode(mode);
        setSelectedPersonnel(personnel);
        setIsFormOpen({ update: true, delete: false });
    }, []);

    const closeModal = useCallback(() => {
        setIsFormOpen({ ...isFormOpen, update: false });
        setSelectedPersonnel(undefined);
    }, [isFormOpen]);

    const handleFormSubmit = useCallback(async (formData: Personnel) => {
        setAcLoading(true);
        if (mode === 'add') {
            const newPersonnel = {
                ...formData,
                id: String(Math.floor(Math.random() * 1001))
            };

            await personnelApi.create(newPersonnel);
            setState(prev => ({
                ...prev,
                data: [newPersonnel, ...prev.data]
            }));
        } else {
            await personnelApi.update(formData.id, formData);
            setState(prev => ({
                ...prev,
                data: prev.data.map(item => {
                    return item.id == formData.id ? formData : item
                }
                ),
            }));
        }
        setAcLoading(false);
    }, [mode, setState]);

    const onOpenAddModal = useCallback(() => {
        openModal('add')
    }, [])

    const onOpenEditModal = useCallback((personnel: Personnel) => {
        openModal('edit', personnel)
    }, [])

    const confirmDelete = (id: string) => {
        setQuery({ id });
        setIsFormOpen({ ...isFormOpen, delete: true });
    }

    const handleDelete = useCallback(async () => {
        const id = getQuery('id');
        setAcLoading(true);
        try {
            await personnelApi.delete(id!);
            setState(prev => ({
                ...prev,
                data: prev.data.filter(item => String(item.id) !== id),
            }));
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsFormOpen({ ...isFormOpen, delete: false });
            setAcLoading(false);
        }
    }, [getQuery, setState]);

    return (
        <>
            <PersonnelHeader onAddStaff={onOpenAddModal} />

            <ListPersonnel
                data={data}
                onEdit={onOpenEditModal}
                onDelete={confirmDelete}
            />

            <PersonnelFormModal
                isOpen={isFormOpen.update}
                idLoading={acLoading}
                mode={mode}
                initialValues={selectedPersonnel}
                onClose={closeModal}
                onSubmit={handleFormSubmit}
            />

            <DeleteConfirmModal
                isOpen={isFormOpen.delete}
                onClose={() => setIsFormOpen({ ...isFormOpen, delete: false })}
                onConfirm={async () => await handleDelete()}
                isLoading={acLoading}
            />

        </>
    );
};

export default PersonnelManage;