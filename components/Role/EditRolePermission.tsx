import clsx from 'clsx';
import FieldButton from '../Field/FieldButton';
import axios from '@/libs/axios';
import { IPermission } from '@/types/role';
import RolePermissionBox from './RolePermissionBox';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    role: any;
    refresh: () => void;
    close: () => void;
    userPermissions?: IPermission[];
}

const EditRolePermission = ({ role, refresh, close }: Props) => {
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

    const getRolePermissions = useCallback(async () => {
        try {
            const { data } = await axios.get(`roles/${role?.id}`);
            let pre_permitted: string[] = [];
            data?.data?.permissions.forEach((element: any) => {
                pre_permitted.push(element.id);
            });
            setSelectedPermissionArray(pre_permitted);
        } catch (error) {}
    }, [role]);

    useEffect(() => {
        getRolePermissions();
    }, [getRolePermissions]);

    const formHandler = async (e: any) => {
        e.preventDefault();
        try {
            const fd = {
                id: role?.id,
                permissions: selectedPermissionArray,
            };
            await axios.post('/roles/update-permissions', fd);
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
