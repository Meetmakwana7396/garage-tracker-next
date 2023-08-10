import FieldButton from '@/components/Field/FieldButton';
import PasswordField from '@/components/Field/PasswordField';
import { useAuth } from '@/hooks/useAuth';
import { IAuthLogin } from '@/types/auth';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const Login = () => {
    const { login } = useAuth();
    const validationSchema = yup
        .object({
            firstName: yup.string().required(),
            age: yup.number().positive().integer().required(),
        })
        .required();

    const { register, handleSubmit, formState } = useForm<IAuthLogin>({
        defaultValues: {
            email: '', // Set initial value for email field
            password: '', // Set initial value for password field
        },
        // resolver: yupResolver(schema),
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
                className="flex min-h-screen items-center justify-center bg-cover bg-center bg-[#000000]/30 bg-blend-overlay"
                style={{ backgroundImage: 'url(/assets/images/login-poster1.jpg)' }}
            >
                <div>
                    <div className="-mt-20 flex-none">
                        <p className="text-center text-[48px] text-white font-bold">Logo</p>
                    </div>

                    <div className="panel w-full mt-20 max-w-lg sm:w-[480px]">
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

                            <div>
                                <label className="" htmlFor="password">
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

                            <FieldButton
                                loading={formState.isSubmitting}
                                type="submit"
                                className="btn-primary btn-lg w-full"
                            >
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
