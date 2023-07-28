import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { IVerifyOtp } from '@/types/auth';
import { useRouter } from 'next/router';
import FieldButton from '@/components/Field/FieldButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import Head from 'next/head';
import Image from 'next/image';

const VerifyOtp = () => {
    const router = useRouter();
    const { email } = router.query;
    const { verifyEmail } = useAuth();
    const { register, handleSubmit, formState } = useForm<IVerifyOtp>({
        defaultValues: {
            otp: '', // Set initial value for email field
        },
    });

    useEffect(() => {
        if (router.isReady && !email) {
            router.push('/login');
        }
    }, [router, email]);

    const formHandler: SubmitHandler<IVerifyOtp> = async (data) => {
        await verifyEmail({ ...data, email: email || '' });
    };
    return (
        <React.Fragment>
            <Head>
                <title>Verify OTP</title>
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
                        <h2 className="mb-3 text-2xl font-bold">OTP Verification</h2>
                        <p className="mb-7">Enter the one-time password (OTP) to verify your identity.</p>

                        <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                            <div>
                                <label className="form-label">Verification Code</label>
                                <input
                                    {...register('otp')}
                                    name="otp"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter Verification Code"
                                />
                            </div>
                            <FieldButton
                                loading={formState.isSubmitting}
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Verify
                            </FieldButton>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default VerifyOtp;

VerifyOtp.middleware = {
    auth: false,
    verify: false,
};

VerifyOtp.layout = 'nosidebar';
