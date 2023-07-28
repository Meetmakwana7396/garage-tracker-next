import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { IAuthResetPassword } from '@/types/auth';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const ResetPassword = () => {
    const router = useRouter();
    const { email, otp } = router.query;
    const { resetPassword } = useAuth();
    const { register, handleSubmit, formState } = useForm<IAuthResetPassword>({
        defaultValues: {
            password: '',
            password_confirmation: '',
        },
    });

    useEffect(() => {
        if (router.isReady && !email && !otp) {
            router.push('/login');
        }
    }, [router, email, otp]);

    const formHandler: SubmitHandler<IAuthResetPassword> = async (values) => {
        await resetPassword({ ...values, email: email, otp: otp });
    };

    return (
        <React.Fragment>
            <Head>
                <title>Reset Password</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
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
                    <div className="panel m-6 mt-20 w-full max-w-lg sm:w-[480px]">
                        <div className="mx-auto space-y-[25px] rounded bg-white">
                            <h2 className="mb-3 text-2xl font-bold">Reset Password</h2>

                            <form className="space-y-4" onSubmit={handleSubmit(formHandler)}>
                                <div>
                                    <label className="form-label">Password</label>
                                    <div>
                                        <input
                                            {...register('password')}
                                            name="password"
                                            type="password"
                                            className="form-input"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label">Confirm password</label>
                                    <div>
                                        <input
                                            {...register('password_confirmation')}
                                            name="password_confirmation"
                                            type="password"
                                            className="form-input"
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <FieldButton
                                        disabled={formState.isSubmitting}
                                        type="submit"
                                        className="btn-primary mt-6 block w-full"
                                    >
                                        Reset Password
                                    </FieldButton>
                                </div>
                            </form>

                            <p className="text-lightblack text-center">
                                <Link
                                    href="/login"
                                    className="text-darkblue hover:text-primary underline transition-all duration-300"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ResetPassword;

ResetPassword.middleware = {
    auth: false,
    verify: true,
};

ResetPassword.layout = 'nosidebar';
