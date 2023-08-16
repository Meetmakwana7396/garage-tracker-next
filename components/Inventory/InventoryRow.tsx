import React from 'react';
import IconReload from '../Icon/IconReload';
import Tippy from '@tippyjs/react';
import IconEdit from '../Icon/IconEdit';
import IconEye from '../Icon/IconEye';
import Link from 'next/link';
import { useHelper } from '@/hooks/useHelper';
import 'tippy.js/dist/tippy.css';

const InventoryRow = ({ data }: any) => {
    const { getAttorneyStatus, formatDate } = useHelper();
    return (
        <tr key={data.id}>
            <td>
                <div className="whitespace-nowrap">{data.Id}</div>
            </td>
            <td>
                <div className="whitespace-nowrap">{data.name}</div>
            </td>

            <td>
                <div className="whitespace-nowrap">{data.email}</div>
            </td>
            <td>
                <div className="whitespace-nowrap">{formatDate(data.created_at)}</div>
            </td>
            <td>
                <div
                    className={`status capitalize status-${getAttorneyStatus(data?.status)}`}
                    // className="status status-approved"
                >
                    {getAttorneyStatus(data?.status)}
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
                <Tippy content="Edit Details">
                    <span
                    // onClick={() => {
                    //     editAttorneyModal.current.open(data?.id);
                    // }}
                    >
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

export default InventoryRow;
