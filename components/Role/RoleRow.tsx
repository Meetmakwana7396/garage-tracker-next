import IconReload from '../Icon/IconReload';
import IconEdit from '../Icon/IconEdit';
import Tippy from '@tippyjs/react';
import IconEye from '../Icon/IconEye';
import Link from 'next/link';
import axios from '@/libs/axios';
import { useHelper } from '@/hooks/useHelper';
import Sheet from '../Essentials/Sheet';
import { useRef } from 'react';
import Pop from '../Essentials/Pop';
import PopButton from '../Essentials/PopButton';
import EditRoleName from './EditRoleName';
import IconArrowLeftRight from '../Icon/IconAt copy';
import EditRolePermission from './EditRolePermission';

interface IRoleRow {
    role: any;
    refresh: () => void;
}

const RoleRow = ({ role, refresh }: IRoleRow) => {
    const editRoleNameRef = useRef<any>();
    const editRolePermissionRef = useRef<any>();
    const { formatDate } = useHelper();

    const changeStatus = async (status: string) => {
        try {
            if (!confirm(`This will change role's status to ${status}`)) {
                return;
            }
            const fd = {
                id: role?.id,
                status: status,
            };
            await axios.post('/roles/update-status', fd);
            refresh();
        } catch (error) {}
    };

    return (
        <>
            <tr key={role.id}>
                <td>
                    <div className="whitespace-nowrap">{role.id}</div>
                </td>
                <td>
                    <div className="whitespace-nowrap">{role.name}</div>
                </td>
                <td>
                    <div className="whitespace-nowrap">{formatDate(role.createdAt)}</div>
                </td>
                <td>
                    <div className="flex gap-2 items-center">
                        <div className={`status capitalize status-${role.status.toLowerCase()}`}>{role.status}</div>

                        <Pop
                            button={
                                <Tippy content="Change Status">
                                    <span>
                                        <IconArrowLeftRight className="w-4 h-4 cursor-pointer" />
                                    </span>
                                </Tippy>
                            }
                            width="w-[150px]"
                        >
                            <PopButton onClick={() => changeStatus('ACTIVE')}>
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary inline-block w-3 h-3 px-[5px] text-xs rounded-full text-black"></div>
                                    ACTIVE
                                </div>
                            </PopButton>
                            <PopButton onClick={() => changeStatus('INACTIVE')}>
                                <div className="flex items-center gap-2">
                                    <div className="bg-danger inline-block w-3 h-3 px-[5px] text-xs rounded-full text-black"></div>
                                    INACTIVE
                                </div>
                            </PopButton>
                        </Pop>
                    </div>
                </td>

                <td className="max-w-xs flex gap-2">
                    <Link href={`/attorney/${role?.id}`}>
                        <Tippy content="View Details">
                            <span>
                                <IconEye className="action-icon " />
                            </span>
                        </Tippy>
                    </Link>

                    <Pop
                        button={
                            <Tippy content="Edit Role">
                                <span>
                                    <IconEdit className="action-icon " />
                                </span>
                            </Tippy>
                        }
                        width="w-[150px]"
                    >
                        <PopButton onClick={() => editRoleNameRef.current.open()}>Edit Name</PopButton>
                        <PopButton onClick={() => editRolePermissionRef.current.open()}>Edit Permissions</PopButton>
                    </Pop>

                    {role?.status === 4 && (
                        <Tippy content="Restore Expert">
                            <span>
                                <IconReload className="action-icon text-secondary" />
                            </span>
                        </Tippy>
                    )}
                </td>
            </tr>
            <Sheet ref={editRoleNameRef} width="600px">
                <EditRoleName role={role} refresh={refresh} close={() => editRoleNameRef?.current?.close()} />
            </Sheet>
            <Sheet ref={editRolePermissionRef} width="600px">
                <EditRolePermission
                    role={role}
                    refresh={refresh}
                    close={() => editRolePermissionRef?.current?.close()}
                />
            </Sheet>
        </>
    );
};

export default RoleRow;
