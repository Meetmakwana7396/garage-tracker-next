import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';
import { useHelper } from '@/hooks/useHelper';

interface Props {
    data: any;
    refresh: () => void;
    close: () => void;
}
interface IEditRoleName {
    name: string;
}

const EditRoleName = ({ data, refresh, close }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IEditRoleName>({
        defaultValues: {
            name: data?.name || '',
        },
    });

    const formHandler = async (values: IEditRoleName) => {
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
            <h1 className="mb-5 text-xl font-bold">Edit role name</h1>
            <form className="styled-form space-y-5" onSubmit={handleSubmit(formHandler)}>
                <div className="grid grid-cols-1 gap-4">
                    <div className={clsx(errors && errors.name && 'has-error')}>
                        <label className="form-label">Name</label>
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

export default EditRoleName;
