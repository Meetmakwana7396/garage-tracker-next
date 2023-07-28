import { useDispatch, useSelector } from 'react-redux';
import axios from '@/libs/axios';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '@/libs/cookie';
import { fetchUser as getUser, setLogout } from '@/store/authSlice';
import { useCallback } from 'react';
import { IAuthForgotPassword, IAuthLogin, IAuthRegister, IAuthResetPassword, IVerifyOtp } from '@/types/auth';
import { IRootState } from '@/store/store';

export const useAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { status, user: authUser } = useSelector((state: IRootState) => state.auth);

    const fetchUser = useCallback(() => {

        try {
            const token = getCookie('auth.__token');
            if (token) {
                dispatch(getUser() as any);
            } else {
                dispatch(setLogout());
            }
        } catch {}
    }, [dispatch]);

    const login = async (args: IAuthLogin) => {
        try {

            const { data } = await axios.post('/auth/login', args);
            setCookie('auth.__token', data.data.token);
            fetchUser();
        } catch {}
    };

    // const register = async (args: IAuthRegister) => {
    //     try {
    //         await axios.post('/auth/register', { ...args });
    //         await login({ email: args.email, password: args.password });
    //     } catch {}
    // };

    const forgotPassword = async (args: IAuthForgotPassword) => {
        try {
            await axios.post('/auth/password/forgot', args);
            setTimeout(() => {
                const encodedEmail = encodeURIComponent(args.email);
                router.push(`/account/verify-otp?email=${encodedEmail}`);
            }, 1000);
        } catch {}
    };

    const resetPassword = async (args: IAuthResetPassword) => {
        try {
            await axios.post('/auth/password/reset/set-password', args);
            router.push('/login');
        } catch {}
    };

    const resendEmailVerification = async () => {
        try {
            await axios.post('/auth/email/verify/resend');
        } catch {}
    };

    const verifyEmail = async (args: IVerifyOtp) => {
        try {
            // await axios.get(router.query.token as string);
            await axios.post('/auth/password/reset/otp-verification', args);
            const encodedEmail = encodeURIComponent(args.email);
            const encodedOtp = encodeURIComponent(args.otp);

            router.push(`/password/reset?email=${encodedEmail}&&otp=${encodedOtp}`);

            // await fetchUser();
        } catch {}
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
        } catch {}

        dispatch(setLogout());
    };

    const isLoggedIn = status === 'authenticated' && !!authUser;

    const isAdmin = isLoggedIn && !!authUser?.is_admin;

    const isSubscribed = isLoggedIn && !!authUser?.is_subscribed;

    const user = (isLoggedIn && authUser) || null;

    return {
        fetchUser,
        // register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        verifyEmail,
        logout,
        isLoggedIn,
        isAdmin,
        isSubscribed,
        user,
    };
};