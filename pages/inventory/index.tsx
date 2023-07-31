import IconSearch from '@/components/Icon/IconSearch';
import Header from '@/components/Layout/Header';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import EditAttorney from '@/components/Attorney/EditAttorney';
import TabBlock from '@/components/Layout/TabBlock';
import Th from '@/components/Table/Th';
import IconEye from '@/components/Icon/IconEye';
import IconEdit from '@/components/Icon/IconEdit';
import IconReload from '@/components/Icon/IconReload';
import TableLoader from '@/components/Essentials/TableLoader';
import Pagination from '@/components/Essentials/Pagination';
import Sheet from '@/components/Essentials/Sheet';
import AddInventoryItem from '@/components/Inventory/AddInventoryItem';

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

    const prevNextPage = async (url: string) => {
        try {
            setIsLoading(true);
            if (url) {
                const { data } = await axios.get(`/admin/attorneys${url}`);
                setInventory(data.data.data);
                setMeta(data.data.meta);
            }
        } catch {
            setInventory(null);
            setMeta(null);
        }
        setIsLoading(false);
    };

    return (
        <React.Fragment>
            <Head>
                <title>GT - Inventory</title>
            </Head>
            <div className="p-6 space-y-10">
                {/* Table filters  */}
                <div className="flex flex-wrap items-center pb-3 justify-between gap-4 border-b">
                    <h2 className="text-5xl tracking-wide text-gray-400 font-semibold leading-none">Inventory</h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="">
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
                    </div>
                </div>

                {/* Table Section  */}
                <div>
                    {/* Action Buttons  */}
                    <div className="flex justify-end mb-3">
                        <Sheet width="800px" button={<button className="btn btn-primary">Add item</button>}>
                            <AddInventoryItem />
                        </Sheet>
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
                    prevNextPage={prevNextPage}
                    page={(value) => setParams({ ...params, per_page: value })}
                    goToPage={(value) => console.log(value)}
                />
            </div>
        </React.Fragment>
    );
};

// Index.middleware = {
//     auth: true,
// };

export default InventoryIndex;
