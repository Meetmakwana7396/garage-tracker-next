export type IUserProfile = {
    first_name: string;
    last_name: string;
    email: string;
};

export type IPasswordChange = {
    current_password: string;
    password: string;
    password_confirmation: string;
};
