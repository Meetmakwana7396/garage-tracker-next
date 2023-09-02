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
interface IEditUser {
    firstName: string;
    lastName: string;
    role_id: string;
    status: string;
}

const EditUser = ({ data, refresh, close }: Props) => {
    const { userStatus } = useHelper();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IEditUser>({
        defaultValues: {
            firstName: data?.firstName || '',
            lastName: data?.lastName || '',
            role_id: 'bc48e865-4108-447f-9393-56eed36418e4',
            status: data?.status || '',
        },
    });

    const formHandler = async (values: IEditUser) => {
        try {
            const fd = {
                id: data?.id,
                firstName: values.firstName,
                lastName: values.lastName,
                role_id: values.role_id,
                status: values.status,
            };
            await axios.post('/users/update', fd);
            refresh();
            close();
        } catch (error) {}
    };

    return (
        <div>
            <h1 className="mb-5 text-xl font-bold">Edit user</h1>
            <form className="styled-form space-y-5" onSubmit={handleSubmit(formHandler)}>
                <div className="grid grid-cols-1 gap-4">
                    <div className={clsx(errors && errors.firstName && 'has-error')}>
                        <label className="form-label">First name</label>
                        <input
                            {...register('firstName')}
                            type="text"
                            className="form-input"
                            placeholder="First name..."
                        />
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

export default EditUser;
