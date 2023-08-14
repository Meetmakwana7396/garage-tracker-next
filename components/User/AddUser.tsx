import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ICreateUser {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    userStatus: string;
    password: string;
    newPassword: string;
}

const AddUser = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICreateUser>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            userStatus: '',
            password: '',
            newPassword: '',
        },
    });

    const formHandler = (values: ICreateUser) => {
        console.log(values);
    };

    return (
        <div>
            <h2 className="font-semibold text-2xl">Add user</h2>

            <form className="space-y-5 mt-8" onSubmit={handleSubmit(formHandler)}>
                <div className={clsx(errors && errors.firstName && 'has-error')}>
                    <label className="form-label">
                        First name
                    </label>
                    <input
                        {...register('firstName')}
                        type="text"
                        className="form-input"
                        placeholder="First name..."
                    />
                </div>

                <div className={clsx(errors && errors.lastName && 'has-error')}>
                    <label className="form-label">
                        Last name
                    </label>
                    <input
                        {...register('lastName')}
                        type="text"
                        className="form-input"
                        placeholder="Last name..."
                    />
                </div>

                <div className={clsx(errors && errors.email && 'has-error')}>
                    <label className="form-label">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        id="email"
                        type="text"
                        className="form-input"
                        placeholder="Email address..."
                    />
                </div>

                <div className={clsx(errors && errors.userStatus && 'has-error')}>
                    <label className="form-label">
                        Status
                    </label>
                    <input
                        {...register('userStatus')}
                        type="text"
                        className="form-input"
                        placeholder="User status..."
                    />
                </div>

                <div className={clsx(errors && errors.firstName && 'has-error')}>
                    <label className="form-label" htmlFor="email">
                        Role
                    </label>
                    <input
                        {...register('firstName')}
                        id="firstName"
                        type="text"
                        className="form-input"
                        placeholder="Role..."
                    />
                </div>

                <div className={clsx(errors && errors.firstName && 'has-error')}>
                    <label className="form-label" htmlFor="email">
                        First name
                    </label>
                    <input
                        {...register('firstName')}
                        id="firstName"
                        type="text"
                        className="form-input"
                        placeholder="First name..."
                    />
                </div>
            </form>
        </div>
    );
};

export default AddUser;
