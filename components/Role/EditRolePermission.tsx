import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';
import { IPermission } from '@/types/role';
import RolePermissionBox from './RolePermissionBox';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

interface Props {
    data: any;
    refresh: () => void;
    close: () => void;
    userPermissions?: IPermission[];
}
interface IEditRolePermission {
    name: string;
}

const EditRolePermission = ({ data, refresh, close, userPermissions }: Props) => {
    const { permissions } = useSelector((state: any) => state.global);
    const [selectedPermissionArray, setSelectedPermissionArray] = useState<string[]>([]);

    const handlePermissionSelection = (id: string) => {
        const isPermissionExisting = selectedPermissionArray.some((permission) => permission === id);
        if (isPermissionExisting) {
            const updatedArray = selectedPermissionArray.filter((permission) => permission !== id);
            setSelectedPermissionArray(updatedArray);
        } else {
            setSelectedPermissionArray([...selectedPermissionArray, id]);
        }
    };

    useEffect(() => {
        console.log("bro");

    }, []);

    const formHandler = async () => {
        try {
            const fd = {
                id: data?.id,
                permissions: selectedPermissionArray,
            };
            await axios.post('/roles/update-name', fd);
            refresh();
            close();
        } catch (error) {}
    };

    return (
        <div>
            <h1 className="mb-5 text-xl font-bold">Edit role permission</h1>
            <form className="styled-form space-y-5" onSubmit={formHandler}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="form-label">Permissions</label>
                        <div className="grid sm:grid-cols-2 gap-8 grid-cols-1">
                            {permissions.map((permission: IPermission) => (
                                <RolePermissionBox
                                    permission={permission}
                                    selectedPermissionArray={selectedPermissionArray}
                                    key={permission.id}
                                    handlePermissionSelection={handlePermissionSelection}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-button-bar">
                    <FieldButton type="submit" className="btn btn-primary">
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

export default EditRolePermission;
