import clsx from 'clsx';
import React from 'react';
import { useHelper } from '@/hooks/useHelper';
import { useForm } from 'react-hook-form';
import PasswordField from '../Field/PasswordField';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';
import toast from '@/libs/toast';
import IconUserPlus from '../Icon/IconUserPlus';

interface Props {
    refresh: () => void;
    close: () => void;
}
interface ICreateRole {
    name: string;
}

const AddRole = ({ refresh, close }: Props) => {
    const { userStatus } = useHelper();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICreateRole>({
        defaultValues: {
            name: '',
        },
    });

    const formHandler = async (values: ICreateRole) => {
        try {
            const fd = {
                name: values.name,
            };
            await axios.post('/roles/create', fd);
            refresh();
        } catch (error) {}
    };

    return (
        <div>
            <h1 className="mb-5 text-xl font-bold items-center flex gap-3">
                <span className="p-1 rounded text-white bg-primary">
                    <IconUserPlus className="w-5 h-5" />
                </span>
                Add user
            </h1>
            <form className="styled-form space-y-5" onSubmit={handleSubmit(formHandler)}>
                <h1 className="mb-5 text-lg font-semibold">Basic Information</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={clsx(errors && errors.name && 'has-error')}>
                        <label className="form-label">First name</label>
                        <input {...register('name')} type="text" className="form-input" placeholder="Name..." />
                    </div>
                </div>

                <div className="modal-button-bar">
                    <FieldButton type="submit" loading={isSubmitting} className="btn btn-primary">
                        Submit
                    </FieldButton>
                    <button className="btn btn-ghost" onClick={close}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRole;
