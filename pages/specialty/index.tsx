import IconSearch from '@/components/Icon/IconSearch';
import Header from '@/components/Layout/Header';
import Pagination from '@/components/Pagination';
import AddSpecialty from '@/components/Specialty/AddSpecialty';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Head from 'next/head';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiEdit, BiTrash } from 'react-icons/bi';
import Loading from '@/components/Loading';
import TableLoader from '@/components/TableLoader';
import TabBlock from '@/components/Layout/TabBlock';
import Th from '@/components/Table/Th';
import Link from 'next/link';
import { FiEye, FiRefreshCcw } from 'react-icons/fi';

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

const Index = () => {
    const addSpecialtyModal = useRef<any>();
    const [attorneys, setAttorneys] = useState<any>(dummyData);
    const [meta, setMeta] = useState<any>(null);
    const [counts, setCounts] = useState<any>(null);
    const [tabs, setTabs] = useState('all');
    const [params, setParams] = useState(defaultParams);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <React.Fragment>
            <Head>
                <title>Specialty</title>
            </Head>
            {/* Table filters  */}
            <Header title={'Specialties'} />
            <div className="p-6 space-y-8">
                <div className="flex flex-wrap items-center justify-end gap-4">
                    {/* <h2 className="text-xl"></h2> */}
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex gap-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pr-10"
                                    placeholder="Search..."
                                    value={params.filter}
                                    onChange={(e) => setParams({ ...params, filter: e.target.value })}
                                    // onKeyDown={(e) => {
                                    //     if (e.key === 'Enter') {
                                    //         getSpecialties('1');
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
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    addSpecialtyModal.current.open();
                                }}
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section  */}
                <div>
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
                                    {attorneys ? (
                                        <>
                                            {attorneys.length > 0 ? (
                                                attorneys.map((data: any) => {
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
                                                                            <FiEye className="action-icon text-secondary" />
                                                                        </span>
                                                                    </Tippy>
                                                                </Link>
                                                                <Tippy content="Edit Details">
                                                                    <span>
                                                                        <BiEdit
                                                                            className="action-icon text-secondary"
                                                                            // onClick={() => {
                                                                            //     setTimeout(() => {
                                                                            //         editAttorneyModal.current.open(
                                                                            //             data?.id
                                                                            //         );
                                                                            //     });
                                                                            // }}
                                                                        />
                                                                    </span>
                                                                </Tippy>

                                                                {data?.status === 4 && (
                                                                    <Tippy content="Restore Expert">
                                                                        <span>
                                                                            <FiRefreshCcw className="action-icon text-secondary" />
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
            </div>
        </React.Fragment>
    );
};

// Index.middleware = {
//     auth: true,
// };

export default Index;
