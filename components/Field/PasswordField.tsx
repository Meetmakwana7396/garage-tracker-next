import React, { useState } from 'react';
import IconEye from '../Icon/IconEye';
import clsx from 'clsx';
import IconEyeCross from '../Icon/IconEyeCross';

const PasswordField = ({ register, ...rest }: any) => {
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="relative">
            <input {...rest} {...register} type={clsx(isShow ? 'text' : 'password')} className="form-input" />
            <span className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsShow(!isShow)}>
                {isShow ? <IconEyeCross className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
            </span>
        </div>
    );
};

export default PasswordField;
