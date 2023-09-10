import { IPermission } from '@/types/role';
import clsx from 'clsx';

interface IProps {
    permission: IPermission;
    handlePermissionSelection: (id: string) => void;
    selectedPermissionArray: string[];
}

const RolePermissionBox = ({ permission, handlePermissionSelection, selectedPermissionArray }: IProps) => {
    return (
        <div
            className={clsx(
                'rounded-lg border overflow-hidden dark:border-black-more-light',
                selectedPermissionArray.includes(permission.id) && 'border-2 border-primary dark:border-primary'
            )}
        >
            <label
                className="p-3 font-bold flex gap-2 border-b dark:border-black-more-light bg-supporting dark:bg-black-more-light/30 items-center cursor-pointer"
                htmlFor={permission.id}
            >
                <input
                    type="checkbox"
                    className="form-checkbox border-gray-400"
                    id={permission.id}
                    onChange={() => handlePermissionSelection(permission.id)}
                />
                {permission.name}
            </label>
            <div className="p-4">
                <ul>
                    {permission.permissions.map((sub_permission) => (
                        <li key={sub_permission.id}>
                            <label
                                className={clsx(
                                    'gap-1 flex items-center font-normal',
                                    selectedPermissionArray.includes(sub_permission.featureId)
                                        ? 'pointer-events-none'
                                        : 'cursor-pointer'
                                )}
                                htmlFor={sub_permission.id}
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    id={sub_permission.id}
                                    checked={
                                        selectedPermissionArray.includes(sub_permission.featureId) ||
                                        selectedPermissionArray.includes(sub_permission.id)
                                    }
                                    onChange={() => handlePermissionSelection(sub_permission.id)}
                                />
                                {sub_permission.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RolePermissionBox;
