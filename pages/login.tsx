import FieldButton from '@/components/Field/FieldButton';
import PasswordField from '@/components/Field/PasswordField';
import { useAuth } from '@/hooks/useAuth';
import { IAuthLogin } from '@/types/auth';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

const Login = () => {
    const { login } = useAuth();
    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IAuthLogin>({
        defaultValues: {
            email: '', // Set initial value for email field
            password: '', // Set initial value for password field
        },
        resolver: yupResolver(validationSchema),
    });

    const formHandler: SubmitHandler<IAuthLogin> = async (data) => {
        await login(data);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Garage Tracker Login</title>
            </Head>
            <div
                className="flex min-h-screen items-center justify-center bg-cover bg-center bg-[#000000]/5 bg-blend-overlay"
                style={{ backgroundImage: 'url(/assets/images/bg-poster.jpg)' }}
            >
                <div>
                    <div className="-mt-20 flex-none">
                        <p className="text-center text-[48px] text-white font-bold">Logo</p>
                    </div>

                    <div className="panel w-full mt-20 max-w-lg sm:w-[480px]">
                        <h2 className="mb-3 font-bold text-xl">Sign In</h2>
                        <p className="mb-7 ">Enter your email and password to login</p>
                        <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                            <div className={clsx(errors && errors.email && 'has-error')}>
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    {...register('email')}
                                    name="email"
                                    id="email"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter Email"
                                />
                            </div>

                            <div className={clsx(errors && errors.password && 'has-error')}>
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>

                                <PasswordField register={{ ...register('password') }} />
                            </div>

                            <div className="text-right">
                                <Link
                                    href="/account/forgot-password"
                                    className=" hover:underline text-sm transition-all hover:text-primary"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <FieldButton loading={isSubmitting} type="submit" className="btn-primary btn-lg w-full">
                                Sign In
                            </FieldButton>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Login;

Login.middleware = {
    auth: false,
};

Login.layout = 'nosidebar';
