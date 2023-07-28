import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { IAuthForgotPassword } from '@/types/auth';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const { register, handleSubmit, formState } = useForm<IAuthForgotPassword>({
        defaultValues: {
            email: '', // Set initial value for email field
        },
    });

    const formHandler: SubmitHandler<IAuthForgotPassword> = async (data) => {
        await forgotPassword(data);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Verify Email</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center  bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="">
                    <Image
                        className="w-[60%] mx-auto h-auto -mt-20 object-cover flex-none"
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={32}
                        height={28}
                        priority
                        quality={100}
                    />
                    <div className="panel m-6 w-full mt-20 max-w-lg sm:w-[480px]">
                        <h2 className="mb-3 text-xl font-bold">Password Reset</h2>
                        <p className="mb-7">Enter your email to recover your ID</p>

                        <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                            <div>
                                {' '}
                                <label className="form-label">Email address</label>
                                <input
                                    {...register('email')}
                                    name="email"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <FieldButton loading={formState.isSubmitting} type="submit" className="btn-primary w-full">
                                Send
                            </FieldButton>
                            <p className="text-lightblack text-xs text-center">
                                <Link
                                    href="/login"
                                    className="text-darkblue hover:text-primary underline transition-all duration-300"
                                >
                                    Login
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
