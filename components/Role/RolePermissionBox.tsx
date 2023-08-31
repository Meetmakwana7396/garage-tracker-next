import { IPermission } from '@/types/role';

interface IProps {
    permission: IPermission;
    handlePermissionSelection: (id: string) => void;
}

const RolePermissionBox = ({ permission, handlePermissionSelection }: IProps) => {
    return (
        <div className="rounded-lg border overflow-hidden dark:border-black-more-light">
            <label
                className="p-3 font-bold flex gap-2 border-b dark:border-black-more-light bg-supporting dark:bg-black-more-light/30 items-center"
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
                                className="gap-1 flex items-center"
                                htmlFor={sub_permission.id}
                            >
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    id={sub_permission.id}
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
