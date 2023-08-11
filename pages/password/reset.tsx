import FieldButton from '@/components/Field/FieldButton';
import PasswordField from '@/components/Field/PasswordField';
import IconChevronDown from '@/components/Icon/IconChevronDown';
import { useAuth } from '@/hooks/useAuth';
import toast from '@/libs/toast';
import { IAuthResetPassword } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;
    const { resetPassword } = useAuth();

    const validationSchema = yup.object().shape({
        password: yup.string().min(8).required(),
        password_confirmation: yup.string().min(8).required(),
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<IAuthResetPassword>({
        defaultValues: {
            password: '',
            password_confirmation: '',
        },
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (router.isReady && !token) {
            router.push('/login');
        }
    }, [router, token]);

    const formHandler: SubmitHandler<IAuthResetPassword> = async (values) => {
        if (values.password === values.password_confirmation) {
            await resetPassword({ ...values, verification_token: token });
        } else {
            toast.error('Passwords does not match.');
        }
    };

    return (
        <React.Fragment>
            <Head>
                <title>Reset Password</title>
            </Head>
            <div
                className="flex min-h-screen items-center justify-center bg-cover bg-center bg-[#000000]/5 bg-blend-overlay"
                style={{ backgroundImage: 'url(/assets/images/bg-poster.jpg)' }}
            >
                <div>
                    <div className="-mt-20 flex-none">
                        <p className="text-center text-[48px] text-white font-bold">Logo</p>
                    </div>
                    <div className="panel m-6 mt-20 w-full max-w-lg sm:w-[480px]">
                        <div className="mx-auto space-y-[25px] rounded bg-white">
                            <h2 className="mb-3 text-2xl font-bold">Reset Password</h2>

                            <form className="space-y-4" onSubmit={handleSubmit(formHandler)}>
                                <div className={clsx(!!errors && errors.password && 'has-error')}>
                                    <label className="form-label">Password</label>
                                    <PasswordField register={{ ...register('password') }} />
                                </div>

                                <div className={clsx(!!errors && errors.password_confirmation && 'has-error')}>
                                    <label className="form-label">Confirm password</label>
                                    <PasswordField register={{ ...register('password_confirmation') }} />
                                </div>

                                <div>
                                    <FieldButton
                                        loading={isSubmitting}
                                        type="submit"
                                        className="btn-primary mt-6 block btn-lg w-full"
                                    >
                                        Reset Password
                                    </FieldButton>
                                </div>
                            </form>

                            <p className="text-lightblack text-sm">
                                <Link
                                    href="/login"
                                    className="hover:text-primary hover:underline flex items-center  w-fit p-1 rounded"
                                >
                                    <IconChevronDown className="h-4 w-4 rotate-90" /> Back to login
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
