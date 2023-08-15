import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import PasswordField from '../Field/PasswordField';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';

interface Props {
    refresh: () => void;
}
interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    role_id: string;
    userStatus: string;
    password: string;
    confirmPassword: string;
}

const AddUser = ({ refresh }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICreateUser>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role_id: 'bc48e865-4108-447f-9393-56eed36418e4',
            userStatus: '',
            password: '',
            confirmPassword: '',
        },
    });

    const formHandler = async (values: ICreateUser) => {
        try {
            const fd = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                role_id: values.role_id,
                userStatus: values.userStatus,
                password: values.password,
            };
            await axios.post('/users/create', fd);
            refresh();

        } catch (error) {}
    };

    return (
        <div>
            <h1 className="mb-5 text-xl font-bold">Add User</h1>
            <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                <h1 className="mb-5 text-lg font-semibold">Basic Information</h1>

                <div className="grid grid-cols-2 gap-4">
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

                    <div className={clsx(errors && errors.email && 'has-error', 'col-span-2')}>
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
                            <option value="IN_REVIEW">IN_REVIEW</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
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

                <div className="!mt-10 space-y-5">
                    <h1 className="mb-5 text-lg font-semibold">Create Password</h1>
                    <div className={clsx(errors && errors.password && 'has-error')}>
                        <label className="form-label">Password</label>
                        <PasswordField register={{ ...register('password') }} placeholder="Enter password..." />
                    </div>
                    <div className={clsx(errors && errors.confirmPassword && 'has-error')}>
                        <label className="form-label">Confirm password</label>
                        <PasswordField
                            register={{ ...register('confirmPassword') }}
                            placeholder="Confirm password..."
                        />
                    </div>
                </div>
                <div className="flex justify-start gap-4 !mt-7">
                    <FieldButton type="submit" loading={isSubmitting} className="btn btn-primary">
                        Submit
                    </FieldButton>
                    <button className="btn btn-ghost">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
