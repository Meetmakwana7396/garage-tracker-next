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
import EditUser from '../User/EditUser';

interface IRoleRow {
    data: any;
    refresh: () => void;
}

const RoleRow = ({ data, refresh }: IRoleRow) => {
    const editRoleRef = useRef<any>();
    const { formatDate } = useHelper();

    const deleteUser = async () => {
        try {
            if (confirm('Please confirm you action.')) {
                await axios.delete(`/users/${data.id}`);
                refresh();
            }
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
                    <div
                        className={`status capitalize status-${data.status.toLowerCase()}`}
                        // className="status status-approved"
                    >
                        {data.status}
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

                    <Tippy content="Edit User">
                        <span onClick={() => editRoleRef?.current?.open()}>
                            <IconEdit className="action-icon " />
                        </span>
                    </Tippy>
                    <Tippy content="Delete User">
                        <span onClick={deleteUser}>
                            <IconTrash className="action-icon hover:!text-danger" />
                        </span>
                    </Tippy>

                    {data?.status === 4 && (
                        <Tippy content="Restore Expert">
                            <span>
                                <IconReload className="action-icon text-secondary" />
                            </span>
                        </Tippy>
                    )}
                </td>
            </tr>
            <Sheet ref={editRoleRef} width="600px">
                <EditUser data={data} refresh={refresh} close={() => editRoleRef?.current?.close()} />
            </Sheet>
        </>
    );
};

export default RoleRow;
