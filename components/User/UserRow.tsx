import IconReload from '../Icon/IconReload';
import IconEdit from '../Icon/IconEdit';
import Tippy from '@tippyjs/react';
import IconEye from '../Icon/IconEye';
import Link from 'next/link';
import IconTrash from '../Icon/IconTrash';
import axios from '@/libs/axios';
import { useHelper } from '@/hooks/useHelper';
import Sheet from '../Essentials/Sheet';
import EditUser from './EditUser';
import { useRef } from 'react';

interface IUserRow {
    data: any;
    refresh: () => void;
}

const UserRow = ({ data, refresh }: IUserRow) => {
    const editUserRef = useRef<any>();
    const { formatDate } = useHelper();

    const deleteUser = async () => {
        try {
            if (confirm('Please confirm your action.')) {
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
                    <div className="whitespace-nowrap max-w-[150px] truncate">
                        {data.firstName} {data.lastName}
                    </div>
                </td>

                <td>
                    <div className="whitespace-nowrap">{data.email}</div>
                </td>
                <td>
                    <div className="whitespace-nowrap">{formatDate(data.createdAt)}</div>
                </td>
                <td>
                    <div
                        className={`status capitalize status-${(data?.status).toLowerCase()}`}
                        // className="status status-approved"
                    >
                        {(data?.status).replace('_', '')}
                    </div>
                </td>

                <td className="max-w-xs flex gap-2">
                    <Link href={`/user/${data?.id}`}>
                        <Tippy content="View Details">
                            <span>
                                <IconEye className="action-icon " />
                            </span>
                        </Tippy>
                    </Link>
                    <Tippy content="Edit User">
                        <span onClick={() => editUserRef?.current?.open()}>
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
            <Sheet ref={editUserRef} width="600px">
                <EditUser data={data} refresh={refresh} close={() => editUserRef?.current?.close()} />
            </Sheet>
        </>
    );
};

export default UserRow;
