import IconReload from '../Icon/IconReload';
import IconEdit from '../Icon/IconEdit';
import Tippy from '@tippyjs/react';
import IconEye from '../Icon/IconEye';
import helper from '@/libs/helper';
import Link from 'next/link';

interface IUserRow {
    data: any;
}

const UserRow = ({ data }: IUserRow) => {
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
                    className={`status capitalize status-${helper.getAttorneyStatus(data?.status)}`}
                    // className="status status-approved"
                >
                    {helper.getAttorneyStatus(data?.status)}
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
                <Tippy content="Edit Details">
                    <span>
                        <IconEdit className="action-icon text-secondary" />
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
