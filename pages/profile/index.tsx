import FieldButton from '@/components/Field/FieldButton';
import Header from '@/components/Layout/Header';
import axios from '@/libs/axios';
import { fetchUser, setUser } from '@/store/authSlice';
import { IRootState } from '@/store/store';
import { IPasswordChange, IUserProfile } from '@/types/profile';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.auth);

    const {
        register: registerForm1,
        handleSubmit: handleSubmitForm1,
        formState: formStateForm1,
        setValue: setValueForm1,
        reset: resetForm1,
    } = useForm<IUserProfile>({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
        },
    });

    const {
        register: registerForm2,
        handleSubmit: handleSubmitForm2,
        formState: formStateForm2,
        setValue: setValueForm2,
        reset: resetForm2,
    } = useForm<IPasswordChange>({
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    const handleProfileupdate = async (values: any) => {
        try {
            const { data } = await axios.post('/profile', values);
            resetForm1();
            dispatch(setUser(data.data.user));
        } catch (error) {}
    };

    const handlePasswordChange = async (values: any) => {
        try {
            await axios.post('/auth/change-password', values);
            resetForm2();
        } catch (error) {}
    };

    // const setForm1Values = useCallback(() => {
    //     setValueForm1('first_name', user.first_name);
    //     setValueForm1('last_name', user.last_name);
    //     setValueForm1('email', user.email);
    // }, [setValueForm1, user]);

    // useEffect(() => {
    //     setForm1Values();
    // }, [setForm1Values]);

    return (
        <React.Fragment>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="p-6 px-5">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <form
                            onSubmit={handleSubmitForm1(handleProfileupdate)}
                            className="mb-5 rounded-md border shadow bg-white p-4 dark:border-[#191e3a] dark:bg-black"
                        >
                            <h6 className="mb-5 text-lg font-bold">Profile Information</h6>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="grid flex-1 mt-5 grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label>First Name</label>
                                        <input
                                            {...registerForm1('first_name')}
                                            name="first_name"
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter First Name"
                                        />
                                    </div>

                                    <div>
                                        <label>Last Name</label>
                                        <input
                                            {...registerForm1('last_name')}
                                            name="last_name"
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter Last Name"
                                        />
                                    </div>

                                    <div>
                                        <label>Email</label>
                                        <input
                                            {...registerForm1('email')}
                                            name="email"
                                            type="text"
                                            className="form-input disabled:opacity-60 disabled:bg-black/20"
                                            placeholder="Enter Email"
                                            // disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sticky py-3 right-[43px] bottom-0 sm:col-span-2 w-full bg-white text-right">
                                <FieldButton
                                    loading={formStateForm1.isSubmitting}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </FieldButton>
                            </div>
                        </form>
                    </div>

                    <div>
                        <form
                            onSubmit={handleSubmitForm2(handlePasswordChange)}
                            className="mb-5 rounded-md border shadow bg-white p-4 dark:border-[#191e3a] dark:bg-black"
                        >
                            <h6 className="mb-5 text-lg font-bold">Change Password</h6>
                            <div className="grid gap-5">
                                <div>
                                    <label>Current Password</label>
                                    <input
                                        {...registerForm2('current_password')}
                                        name="current_password"
                                        type="password"
                                        className="form-input"
                                        placeholder="Enter Current Password"
                                    />
                                </div>

                                <div>
                                    <label>New Password</label>
                                    <input
                                        {...registerForm2('password')}
                                        name="password"
                                        type="password"
                                        className="form-input"
                                        placeholder="Enter New Password"
                                    />
                                </div>

                                <div>
                                    <label>Confirm New Password</label>
                                    <input
                                        {...registerForm2('password_confirmation')}
                                        name="password_confirmation"
                                        type="password"
                                        className="form-input"
                                        placeholder="Confirm New Password"
                                    />
                                </div>
                            </div>
                            <div className="sticky py-3 right-[43px] bottom-0 sm:col-span-2 w-full bg-white text-right">
                                <FieldButton
                                    loading={formStateForm2.isSubmitting}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </FieldButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

// Index.middleware = {
//     auth: true,
// };

export default Index;
