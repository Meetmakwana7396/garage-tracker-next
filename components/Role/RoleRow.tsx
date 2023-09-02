import IconReload from '../Icon/IconReload';
import IconEdit from '../Icon/IconEdit';
import Tippy from '@tippyjs/react';
import IconEye from '../Icon/IconEye';
import Link from 'next/link';
import IconTrash from '../Icon/IconTrash';
import axios from '@/libs/axios';
import { useHelper } from '@/hooks/useHelper';
import Sheet from '../Essentials/Sheet';
import { useRef } from 'react';
import Pop from '../Essentials/Pop';
import PopButton from '../Essentials/PopButton';
import EditRoleName from './EditRoleName';
import IconArrowLeftRight from '../Icon/IconAt copy';

interface IRoleRow {
    data: any;
    refresh: () => void;
}

const RoleRow = ({ data, refresh }: IRoleRow) => {
    const editRoleNameRef = useRef<any>();
    const { formatDate } = useHelper();

    const changeStatus = async (status: string) => {
        try {
            if (!confirm("Are you sure you want to change this role's status?")) {
                return;
            }
            const fd = {
                id: data?.id,
                status: status,
            };
            await axios.post('/roles/update-status', fd);
            refresh();
        } catch (error) {}
    };

    return (
        <>
            <tr key={data.id}>
                <td>
                    <div className="whitespace-nowrap">{data.id}</div>
                </td>
                <td>
                    <div className="whitespace-nowrap">{data.name}</div>
                </td>
                <td>
                    <div className="whitespace-nowrap">{formatDate(data.createdAt)}</div>
                </td>
                <td>
                    <div className="flex gap-2 items-center">
                        <div className={`status capitalize status-${data.status.toLowerCase()}`}>{data.status}</div>

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
                    <Link href={`/attorney/${data?.id}`}>
                        <Tippy content="View Details">
                            <span>
                                <IconEye className="action-icon " />
                            </span>
                        </Tippy>
                    </Link>

                    <Pop
                        button={
                            <Tippy content="Edit User">
                                <span>
                                    <IconEdit className="action-icon " />
                                </span>
                            </Tippy>
                        }
                        width="w-[150px]"
                    >
                        <PopButton onClick={() => editRoleNameRef.current.open()}>Edit Name</PopButton>
                        <PopButton>Edit Permissions</PopButton>
                    </Pop>

                    {data?.status === 4 && (
                        <Tippy content="Restore Expert">
                            <span>
                                <IconReload className="action-icon text-secondary" />
                            </span>
                        </Tippy>
                    )}
                </td>
            </tr>
            <Sheet ref={editRoleNameRef} width="600px">
                <EditRoleName data={data} refresh={refresh} close={() => editRoleNameRef?.current?.close()} />
            </Sheet>
        </>
    );
};

export default RoleRow;
