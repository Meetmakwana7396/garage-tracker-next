export interface IAuthForgotPassword {
    email: string;
}

export interface IAuthResetPassword {
    password: string;
    verification_token?: any;
    password_confirmation: string;
}

export interface IAuthLogin {
    email: string;
    password: string;
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
