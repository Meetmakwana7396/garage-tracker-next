export interface IAuthForgotPassword {
    email: string;
}

export interface IAuthResetPassword {
    email?: string | undefined | string[];
    otp?: string | undefined | string[];
    password: string;
    password_confirmation: string;
}

export interface IAuthLogin {
    email: string;
    password: string;
    is_admin: boolean;
}

export interface IForgotPassword {
    email: string;
}

export interface IAuthRegister {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IVerifyOtp {
    email?: string | any;
    otp: string;
}

export interface IIcon {
    className?: string;
}
