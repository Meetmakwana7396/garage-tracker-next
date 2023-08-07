import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { IAuthLogin } from '@/types/auth';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Login = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState } = useForm<IAuthLogin>({
        defaultValues: {
            email: '', // Set initial value for email field
            password: '', // Set initial value for password field
        },
    });

    const formHandler: SubmitHandler<IAuthLogin> = async (data) => {
        await login({ ...data, is_admin: true });
    };

    return (
        <React.Fragment>
            <Head>
                <title>Garage Tracker Login</title>
            </Head>
            <div className="flex border-2  min-h-screen items-center justify-center bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="">
                    <div className="-mt-20 flex-none">
                       <p className='text-center'>Logo</p>
                    </div>

                    <div className="panel m-6 w-full mt-20  max-w-lg sm:w-[480px]">
                        <h2 className="mb-3 font-bold text-xl">Sign In</h2>
                        <p className="mb-7 ">Enter your email and password to login</p>
                        <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                            <div className={``}>
                                <label className="" htmlFor="email">
                                    Email address
                                </label>
                                <input
                                    {...register('email')}
                                    name="email"
                                    id="email"
                                    type="text"
                                    className={`form-input`}
                                    placeholder="Enter Email"
                                />
                            </div>

                            <div className={``}>
                                <label className="" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    {...register('password')}
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-input"
                                    placeholder="Enter Password"
                                />
                            </div>

                            <div>
                                <Link
                                    href="/forgot-password"
                                    className="text-darkblue underline text-xs transition-all duration-300 hover:text-primary"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <FieldButton loading={formState.isSubmitting} type="submit" className="btn-primary w-full">
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
