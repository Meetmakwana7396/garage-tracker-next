import IconReload from '../Icon/IconReload';
import IconEdit from '../Icon/IconEdit';
import Tippy from '@tippyjs/react';
import IconEye from '../Icon/IconEye';
import helper from '@/libs/helper';
import Link from 'next/link';
import IconTrash from '../Icon/IconTrash';
import axios from '@/libs/axios';

interface IUserRow {
    data: any;
    refresh: () => void;
}

const UserRow = ({ data, refresh }: IUserRow) => {
    const deleteUser = async () => {
        try {
            await axios.delete(`/users/${data.id}`);
            refresh();
        } catch (error) {}
    };
    return (
        <tr key={data.id}>
            <td>
                <div className="whitespace-nowrap">{data.id}</div>
            </td>
            <td>
                <div className="whitespace-nowrap">{data.firstName}</div>
            </td>

            <td>
                <div className="whitespace-nowrap">{data.email}</div>
            </td>
            <td>
                <div className="whitespace-nowrap">{helper.formatDate(data.created_at)}</div>
            </td>
            <td>
                <div
                    className={`status capitalize status-${(data?.status).toLowerCase()}`}
                    // className="status status-approved"
                >
                    {data?.status}
                </div>
            </td>

            <td className="max-w-xs flex gap-2">
                <Link href={`/attorney/${data?.id}`}>
                    <Tippy content="View Details">
                        <span>
                            <IconEye className="action-icon text-secondary" />
                        </span>
                    </Tippy>
                </Link>
                <Tippy content="Edit User">
                    <span>
                        <IconEdit className="action-icon text-secondary" />
                    </span>
                </Tippy>
                <Tippy content="Delete User">
                    <span onClick={deleteUser}>
                        <IconTrash className="action-icon hover:text-danger text-secondary" />
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
    );
};

export default UserRow;
