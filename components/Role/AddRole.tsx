import clsx from 'clsx';
import React from 'react';
import { useHelper } from '@/hooks/useHelper';
import { useForm } from 'react-hook-form';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';
import IconRole from '../Icon/IconRole';
import { Switch } from '@radix-ui/react-switch';
import SwitchDemo from '../Essentials/Switch';

interface Props {
    refresh: () => void;
    close: () => void;
}
interface ICreateRole {
    name: string;
    role: string;
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
            role: '',
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
                    <IconRole className="w-5 h-5" />
                </span>
                Add role
            </h1>
            <form className="styled-form space-y-5" onSubmit={handleSubmit(formHandler)}>
                <div className="grid grid-cols-1 gap-4">
                    <div className={clsx(errors && errors.name && 'has-error')}>
                        <label className="form-label">Role name</label>
                        <input {...register('name')} type="text" className="form-input" placeholder="Name..." />
                    </div>

                    <div className={clsx(errors && errors.role && 'has-error')}>
                        <label className="form-label">Status</label>
                        <select {...register('role')} className="form-select" placeholder="User status...">
                            <option value="">Select user status...</option>
                            {userStatus.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <SwitchDemo checked={false} />
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
