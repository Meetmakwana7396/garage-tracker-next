import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';
import IconRole from '../Icon/IconRole';
import RolePermissionBox from './RolePermissionBox';
import { IPermission } from '@/types/role';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
    refresh: () => void;
    close: () => void;
    permissions: IPermission[];
}
interface ICreateRole {
    name: string;
}

const AddRole = ({ refresh, close, permissions }: Props) => {
    const [permissionArray, setPermissionArray] = useState<string[]>([]);

    const validationSchema = yup.object().shape({
        name: yup.string().trim().required(),
    });

    const handlePermissionSelection = (id: string) => {
        const isPermissionExisting = permissionArray.some((permission) => permission === id);

        if (isPermissionExisting) {
            // Remove the existing permission
            const updatedArray = permissionArray.filter((permission) => permission !== id);
            setPermissionArray(updatedArray);
        } else {
            // Add the new permission
            setPermissionArray([...permissionArray, id]);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<ICreateRole>({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const formHandler = async (values: ICreateRole) => {
        try {
            const fd = {
                name: values.name,
                permissions: permissionArray,
            };
            await axios.post('/roles/create', fd);
            refresh();
            close();
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
                    <div>
                        <label className="form-label">Permissions</label>
                        <div className="grid sm:grid-cols-2 gap-8 grid-cols-1">
                            {permissions.map((permission: IPermission) => (
                                <RolePermissionBox
                                    permission={permission}
                                    key={permission.id}
                                    handlePermissionSelection={handlePermissionSelection}
                                />
                            ))}
                        </div>
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
