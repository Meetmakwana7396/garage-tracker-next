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
    email: string;
    role_id: string;
    userStatus: string;
    password: string;
    confirmPassword: string;
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
            email: data?.email || '',
            role_id: 'bc48e865-4108-447f-9393-56eed36418e4',
            userStatus: data?.userStatus || '',
            password: data?.password || '',
            confirmPassword: data?.confirmPassword || '',
        },
    });

    const formHandler = async (values: IEditUser) => {
        try {
            const fd = {
                id: data?.id,
                firstName: values.firstName,
                lastName: values.lastName,
                role_id: values.role_id,
                userStatus: values.userStatus,
            };
            await axios.post('/users/update', fd);
            refresh();
        } catch (error) {}
    };

    return (
        <div>
            <h1 className="mb-5 text-xl font-bold">Edit user</h1>
            <form className="styled-form space-y-5" onSubmit={handleSubmit(formHandler)}>
                <h1 className="mb-5 text-lg font-semibold">Basic Information</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={clsx(errors && errors.firstName && 'has-error')}>
                        <label className="form-label">First name</label>
                        <input
                            {...register('firstName')}
                            type="text"
                            className="form-input"
                            placeholder="First name..."
                        />
                    </div>

                    <div className={clsx(errors && errors.lastName && 'has-error')}>
                        <label className="form-label">Last name</label>
                        <input
                            {...register('lastName')}
                            type="text"
                            className="form-input"
                            placeholder="Last name..."
                        />
                    </div>

                    <div className={clsx(errors && errors.email && 'has-error', 'sm:col-span-2')}>
                        <label className="form-label">Email</label>
                        <input
                            {...register('email')}
                            id="email"
                            type="text"
                            className="form-input"
                            placeholder="Email address..."
                        />
                    </div>

                    <div className={clsx(errors && errors.userStatus && 'has-error')}>
                        <label className="form-label">Status</label>
                        <select {...register('userStatus')} className="form-select" placeholder="User status...">
                            <option value="">Select user status...</option>
                            {userStatus.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={clsx(errors && errors.firstName && 'has-error')}>
                        <label className="form-label">Role</label>
                        <input
                            {...register('role_id')}
                            id="firstName"
                            type="text"
                            className="form-input"
                            placeholder="Role..."
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
