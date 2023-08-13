import IconSearch from '@/components/Icon/IconSearch';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TabBlock from '@/components/Layout/TabBlock';
import Th from '@/components/Table/Th';
import IconEye from '@/components/Icon/IconEye';
import IconEdit from '@/components/Icon/IconEdit';
import IconReload from '@/components/Icon/IconReload';
import TableLoader from '@/components/Essentials/TableLoader';
import Pagination from '@/components/Essentials/Pagination';
import clsx from 'clsx';
import IconCard from '@/components/Icon/IconCard';
import IconList from '@/components/Icon/IconList';
import InventoryCard from '@/components/Inventory/InventoryCard';

const defaultParams = {
    per_page: '10',
    order: 'desc',
    order_field: 'id',
    filter: '',
    page: '1',
    status: '',
};

const dummyData = [
    {
        Id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        created_at: '2023-07-28T12:34:56Z',
        status: 1,
    },
    {
        Id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        created_at: '2023-07-27T09:21:34Z',
        status: 3,
    },
    {
        Id: 3,
        name: 'Michael Johnson',
        email: 'michael.johnson@example.com',
        created_at: '2023-07-26T15:43:21Z',
        status: 2,
    },
    {
        Id: 4,
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        created_at: '2023-07-25T18:09:47Z',
        status: 4,
    },
];

const InventoryIndex = () => {
    const editAttorneyModal = useRef<any>();
    const [inventory, setInventory] = useState<any>(dummyData);
    const [meta, setMeta] = useState<any>(null);
    const [counts, setCounts] = useState<any>(null);
    const [tabs, setTabs] = useState('all');
    const [params, setParams] = useState(defaultParams);
    const [isLoading, setIsLoading] = useState(false);
    const [layout, setLayout] = useState('card');

    return (
        <Fragment>
            <Head>
                <title>Inventory | GT</title>
            </Head>
            <div className="space-y-10">
                {/* Table filters  */}
                <div className="flex flex-wrap items-center pb-3 justify-between gap-4 border-b">
                    <h2 className="text-5xl tracking-wide font-semibold leading-none">Users</h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <Link className="btn btn-primary h-fit" href="/inventory/inventory-add">
                            Add Item
                        </Link>
                    </div>
                </div>

                {/* Data Section  */}
                <div className="container max-w-[1600px]">
                    {/* Filters */}
                    <div className="flex justify-between mb-3">
                        <div className=" flex rounded border overflow-hidden p-1">
                            <div
                                className={clsx(
                                    'py-2 px-2 rounded-[2px] cursor-pointer text-gray-500',
                                    layout === 'card' && 'bg-supporting'
                                )}
                                onClick={() => setLayout('card')}
                            >
                                <IconCard className="w-4 h-4" />
                            </div>
                            <div
                                className={clsx(
                                    'p-2 rounded-[2px] cursor-pointer text-gray-500',
                                    layout === 'table' && 'bg-supporting'
                                )}
                                onClick={() => setLayout('table')}
                            >
                                <IconList className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                className="form-input pr-10"
                                placeholder="Search..."
                                value={params.filter}
                                onChange={(e) => setParams({ ...params, filter: e.target.value })}
                                // onKeyDown={(e) => {
                                //     if (e.key === 'Enter') {
                                //         getAttorneys('1');
                                //     }
                                // }}
                            />
                            <button
                                type="button"
                                className="text-black-dark absolute top-0 right-0 my-auto inline-flex h-10 w-10 items-center justify-center hover:opacity-70"
                            >
                                <IconSearch />
                            </button>
                        </div>
                    </div>
                    {/* Status Tabs  */}
                    <div className="overflow-auto w-full border border-b-0">
                        <ul className="flex whitespace-nowrap gap-2 dark:border-[#191e3a] sm:flex">
                            <TabBlock
                                onClick={() => {
                                    setParams({ ...params, status: '' });
                                    setTabs('all');
                                }}
                                isActive={tabs === 'all'}
                                count={counts && counts[1] + counts[2] + counts[3]}
                                name="All"
                            />
                            <TabBlock
                                onClick={() => {
                                    setParams({ ...params, status: '2' });
                                    setTabs('approved');
                                }}
                                isActive={tabs === 'approved'}
                                count={counts && counts[2]}
                                name="Approved"
                            />
                            <TabBlock
                                onClick={() => {
                                    setParams({ ...params, status: '1' });
                                    setTabs('pending');
                                }}
                                isActive={tabs === 'pending'}
                                count={counts && counts[1]}
                                name="Pending"
                            />
                            <TabBlock
                                onClick={() => {
                                    setParams({ ...params, status: '4' });
                                    setTabs('deleted');
                                }}
                                isActive={tabs === 'deleted'}
                                count={counts && counts[4]}
                                name="Rejected"
                            />
                        </ul>
                    </div>
                    {/* Table  */}
                    <div className="overflow-hidden border p-0">
                        <div className="table-responsive">
                            <table className={`table-hover ${isLoading && 'opacity-50 pointer-events-none'}`}>
                                <thead>
                                    <tr>
                                        <Th
                                            isActive={params?.order_field === 'id'}
                                            isAscending={params.order === 'asc'}
                                            // onClick={() => sortByField('id')}
                                        >
                                            Attorney Id
                                        </Th>
                                        <Th
                                            isActive={params?.order_field === 'first_name'}
                                            isAscending={params.order === 'asc'}
                                        >
                                            Name
                                        </Th>

                                        <Th noSorting>Email</Th>
                                        <Th
                                            isActive={params?.order_field === 'created_at'}
                                            isAscending={params.order === 'asc'}
                                        >
                                            Created At
                                        </Th>
                                        <Th
                                            isActive={params?.order_field === 'status'}
                                            isAscending={params.order === 'asc'}
                                        >
                                            Status
                                        </Th>
                                        <Th noSorting>Action</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory ? (
                                        <>
                                            {inventory.length > 0 ? (
                                                inventory.map((data: any) => {
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
                                                                <div className="whitespace-nowrap">
                                                                    {helper.formatDate(data.created_at)}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className={`status capitalize status-${helper.getAttorneyStatus(
                                                                        data?.status
                                                                    )}`}
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
                                                                    <span
                                                                        onClick={() => {
                                                                            setTimeout(() => {
                                                                                editAttorneyModal.current.open(
                                                                                    data?.id
                                                                                );
                                                                            });
                                                                        }}
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
                                                })
                                            ) : (
                                                <tr className="pointer-events-none">
                                                    <td colSpan={6} className="p-8">
                                                        <p className="mx-auto w-fit"> No data found.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ) : (
                                        <TableLoader colspan={6} />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Pagination
                    meta={meta}
                    // prevNextPage={prevNextPage}
                    page={(value) => setParams({ ...params, per_page: value })}
                    goToPage={(value) => console.log(value)}
                />
            </div>
        </Fragment>
    );
};

// Index.middleware = {
//     auth: true,
// };

export default InventoryIndex;