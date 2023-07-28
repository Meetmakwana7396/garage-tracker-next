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
        specialty_name: 'Cardiology',
        created_at: '2023-07-28T12:34:56Z',
        status: 1,
    },
    {
        Id: 2,
        specialty_name: 'Dermatology',
        created_at: '2023-07-27T09:21:34Z',
        status: 2,
    },
    {
        Id: 3,
        specialty_name: 'Pediatrics',
        created_at: '2023-07-26T15:43:21Z',
        status: 3,
    },
    {
        Id: 4,
        specialty_name: 'Ophthalmology',
        created_at: '2023-07-25T18:09:47Z',
        status: 1,
    },
];

const Index = () => {
    const addSpecialtyModal = useRef<any>();
    const [specialties, setSpecialties] = useState<any>(dummyData);
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
            <div className="p-6 px-5">
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

                {/* Status Tabs  */}
                <div className="overflow-auto border-b">
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

                {/* Table Section  */}
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className={`table-hover ${isLoading && 'opacity-50 pointer-events-none'}`}>
                            <thead className="bg-primary/20">
                                <tr>
                                    <th className={params?.order_field === 'id' ? 'text-primary' : ''}>
                                        <div
                                            className={`inline-flex cursor-pointer font-bold group hover:text-primary  ${
                                                params.order_field === 'id' && 'text-primary'
                                            }`}
                                            // onClick={() => sortByField('id')}
                                        >
                                            Specialty ID
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'id' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>

                                    <th className={params?.order_field === 'name' ? 'text-primary' : ''}>
                                        <div
                                            className={`inline-flex cursor-pointer font-bold group hover:text-primary  ${
                                                params.order_field === 'name' && 'text-primary'
                                            }`}
                                            // onClick={() => sortByField('name')}
                                        >
                                            Specialty
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'name' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>

                                    <th className={params?.order_field === 'created_at' ? 'text-primary' : ''}>
                                        <div
                                            className={`inline-flex cursor-pointer font-bold group hover:text-primary  ${
                                                params.order_field === 'created_at' && 'text-primary'
                                            }`}
                                            // onClick={() => sortByField('created_at')}
                                        >
                                            Created At
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'created_at' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>

                                    <th className={params?.order_field === 'status' ? 'text-primary' : ''}>
                                        <div
                                            className={`inline-flex cursor-pointer font-bold group hover:text-primary  ${
                                                params.order_field === 'status' && 'text-primary'
                                            }`}
                                            // onClick={() => sortByField('status')}
                                        >
                                            Status
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'status' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>

                                    <th className="text-center font-bold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {specialties ? (
                                    <>
                                        {specialties?.length > 0 ? (
                                            specialties.map((data: any) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>
                                                            <div className="whitespace-nowrap">{data.Id}</div>
                                                        </td>
                                                        <td>
                                                            <div className="whitespace-nowrap">
                                                                {data.specialty_name}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="whitespace-nowrap">
                                                                {helper.formatDate(data.created_at)}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div
                                                                className={`status capitalize status-${helper.getSpecialtyStatus(
                                                                    data?.status
                                                                )}`}
                                                                // className="status status-rejected"
                                                            >
                                                                {helper.getSpecialtyStatus(data?.status)}
                                                            </div>
                                                        </td>

                                                        <td className="max-w-xs flex gap-1">
                                                            {/* <BiTrash
                                                                className="action-icon text-red-500"
                                                                onClick={() => deleteSpecialty(data.id)}
                                                            /> */}
                                                            <Tippy content="Edit Details">
                                                                <span>
                                                                    <BiEdit
                                                                        className="action-icon text-blue-500"
                                                                        onClick={() => {
                                                                            addSpecialtyModal.current.open(data);
                                                                        }}
                                                                    />
                                                                </span>
                                                            </Tippy>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr className="pointer-events-none">
                                                <td colSpan={4} className="p-8">
                                                    <p className="mx-auto w-fit"> No data found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ) : (
                                    <TableLoader colspan={5} />
                                )}
                            </tbody>
                        </table>
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
