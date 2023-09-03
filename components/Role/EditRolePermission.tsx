import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';

interface Props {
    data: any;
    refresh: () => void;
    close: () => void;
}
interface IEditRolePermission {
    name: string;
}

const EditRolePermission = ({ data, refresh, close }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IEditRolePermission>({
        defaultValues: {
            name: data?.name || '',
        },
    });

    const formHandler = async (values: IEditRolePermission) => {
        try {
            const fd = {
                id: data?.id,
                name: values.name,
            };
            await axios.post('/roles/update-name', fd);
            refresh();
            close();
        } catch (error) {}
    };

    return (
        <div>
            <h1 className="mb-5 text-xl font-bold">Edit role permission</h1>
            <form className="styled-form space-y-5" onSubmit={handleSubmit(formHandler)}>
                <div className="grid grid-cols-1 gap-4">
                    <div className={clsx(errors && errors.name && 'has-error')}>
                        <label className="form-label">permissions</label>
                        <input {...register('name')} type="text" className="form-input" placeholder="Role name..." />
                    </div>
                </div>

                <div className="modal-button-bar">
                    <FieldButton type="submit" loading={isSubmitting} className="btn btn-primary">
                        Submit
                    </FieldButton>
                    <button className="btn btn-ghost" onClick={close}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditRolePermission;
