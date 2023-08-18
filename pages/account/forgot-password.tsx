import FieldButton from '@/components/Field/FieldButton';
import IconChevronDown from '@/components/Icon/IconChevronDown';
import { useAuth } from '@/hooks/useAuth';
import { IAuthForgotPassword } from '@/types/auth';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IAuthForgotPassword>({
        defaultValues: {
            email: '', // Set initial value for email field
        },
        resolver: yupResolver(validationSchema),
    });

    const formHandler: SubmitHandler<IAuthForgotPassword> = async (data) => {
        await forgotPassword(data);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Verify Email</title>
            </Head>
            <div
                className="flex min-h-screen items-center justify-center bg-center bg-cover dark:text-white-dark bg-[#000000]/5 bg-blend-overlay"
                style={{ backgroundImage: 'url(/assets/images/bg-poster.jpg)' }}
            >
                <div className="">
                    <div className="-mt-20 flex-none">
                        <p className="text-center text-[48px] text-white font-bold">Logo</p>
                    </div>
                    <div className="panel m-6 w-full mt-20 max-w-lg sm:w-[480px]">
                        <h2 className="mb-3 text-xl font-bold">Password Reset</h2>
                        <p className="mb-7">Enter your email to recover your ID</p>

                        <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                            <div className={clsx(!!errors && errors.email && 'has-error')}>
                                <label className="form-label">Email address</label>
                                <input
                                    {...register('email')}
                                    name="email"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <FieldButton loading={isSubmitting} type="submit" className="btn-primary btn-lg w-full">
                                Send
                            </FieldButton>
                            <p className="text-lightblack text-sm">
                                <Link
                                    href="/login"
                                    className="hover:text-primary hover:underline flex items-center  w-fit p-1 rounded"
                                >
                                    <IconChevronDown className="h-4 w-4 rotate-90" /> Back to login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ForgotPassword;

ForgotPassword.middleware = {
    auth: false,
};

ForgotPassword.layout = 'nosidebar';
