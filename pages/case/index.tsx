import AssignExpert from '@/components/Case/AssignExpert';
import CreateInvoiceModal from '@/components/Case/CreateInvoiceModal';
import IconSearch from '@/components/Icon/IconSearch';
import Header from '@/components/Layout/Header';
import Pagination from '@/components/Pagination';
import TableLoader from '@/components/TableLoader';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Head from 'next/head';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiReceipt, BiUser } from 'react-icons/bi';
import { FiEye } from 'react-icons/fi';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Loading from '@/components/Loading';
import TabBlock from '@/components/Layout/TabBlock';

const defaultParams = {
    per_page: '10',
    order: 'desc',
    order_field: 'id',
    filter: '',
    page: '1',
    status: '',
};

const Index = () => {
    const assignExpert = useRef<any>();
    const createInvoice = useRef<any>();
    const [cases, setCases] = useState<any>(null);
    const [meta, setMeta] = useState<any>(null);
    const [counts, setCounts] = useState<any>(null);
    const [tabs, setTabs] = useState('all');
    const [params, setParams] = useState(defaultParams);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);

    const getCases = useCallback(
        async (page: string) => {
            setIsLoading(true);
            try {
                const { data } = await axios.get('/admin/cases', { params: { ...params, page } });
                setCases(data.data.data);
                setCounts(data.data.count);
                setMeta(data.data.meta);
            } catch (error) {}
            setIsLoading(false);
        },
        [params]
    );

    const sortByField = (field: string) => {
        params.order_field === field
            ? params.order === 'desc'
                ? setParams({ ...params, order: 'asc', order_field: field })
                : setParams({ ...params, order: 'desc', order_field: field })
            : setParams({ ...params, order: 'desc', order_field: field });
    };

    const prevNextPage = async (url: string) => {
        try {
            setIsLoading(true);
            if (url) {
                const { data } = await axios.get(`/admin/cases${url}`);
                setCases(data.data.data);
                setMeta(data.data.meta);
            }
        } catch {
            setCases([]);
            setMeta(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getCases('1');
    }, [getCases]);

    return (
        <React.Fragment>
            <Head>
                <title>Case</title>
            </Head>
            {/* Table filters  */}
            <Header title={'Cases'} />
            <div className="p-6 px-5">
                <div className="flex flex-wrap items-center justify-end gap-4">
                    {/* <h2 className="text-xl">Cases</h2> */}
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex gap-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pr-10"
                                    placeholder="Search..."
                                    value={params.filter}
                                    onChange={(e) => setParams({ ...params, filter: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            getCases('1');
                                        }
                                    }}
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
                            <thead>
                                <tr>
                                    <th className={params?.order_field === 'id' ? 'text-primary' : ''}>
                                        <div
                                            className="inline-flex cursor-pointer font-bold group hover:text-primary"
                                            onClick={() => sortByField('id')}
                                        >
                                            Case ID
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'id' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>
                                    <th className={params?.order_field === 'title' ? 'text-primary' : ''}>
                                        <div
                                            className="inline-flex cursor-pointer hover:text-primary font-bold group max-w-xs"
                                            onClick={() => sortByField('title')}
                                        >
                                            Title
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'title' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex  font-bold ">Attorney Name</div>
                                    </th>
                                    <th>
                                        <div
                                            className="inline-flex font-bold"
                                            // onClick={() => sortByField('email')}
                                        >
                                            Expert Name
                                        </div>
                                    </th>

                                    <th>
                                        <div className="inline-flex font-bold ">Location</div>
                                    </th>

                                    <th className={params?.order_field === 'trial_date' ? 'text-primary' : ''}>
                                        <div
                                            className="inline-flex cursor-pointer font-bold group hover:text-primary"
                                            onClick={() => sortByField('trial_date')}
                                        >
                                            Trial Date
                                            <BiChevronDown
                                                className={`action-icon ml-1 group-hover:text-primary ${
                                                    params.order_field === 'trial_date' &&
                                                    params.order === 'asc' &&
                                                    'rotate-180'
                                                }`}
                                            />
                                        </div>
                                    </th>

                                    <th className={params?.order_field === 'status' ? 'text-primary' : ''}>
                                        <div
                                            className="inline-flex cursor-pointer font-bold group hover:text-primary"
                                            onClick={() => sortByField('status')}
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
                                {cases ? (
                                    <>
                                        {cases.length > 0 ? (
                                            cases.map((data: any) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>
                                                            <div className="whitespace-nowrap">{data.id}</div>
                                                        </td>
                                                        <td className="max-w-xs">
                                                            <div className="whitespace-nowrap truncate">
                                                                {helper.isEmpty(data.title)}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="whitespace-nowrap">
                                                                {helper.isEmpty(data.attorney?.first_name) +
                                                                    ' ' +
                                                                    data.attorney?.last_name}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="whitespace-nowrap">
                                                                {data?.expert_id
                                                                    ? helper.isEmpty(data.expert?.first_name) +
                                                                      ' ' +
                                                                      data?.expert?.last_name
                                                                    : '-'}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="whitespace-nowrap">
                                                                {data &&
                                                                    `${helper.isEmpty(data?.city)}, ${helper.isEmpty(
                                                                        data?.states?.name
                                                                    )}`}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="whitespace-nowrap">
                                                                {helper.formatDate(data.trial_date)}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className={`status capitalize status-${helper.getCaseStatus(
                                                                    data?.status
                                                                )}`}
                                                                // className="status status-inprogress"
                                                            >
                                                                {helper.getCaseStatus(data?.status)}
                                                            </div>
                                                        </td>

                                                        <td className="max-w-xs flex gap-2">
                                                            <Link href={`/case/${data?.id}`}>
                                                                <Tippy content="View Details">
                                                                    <span>
                                                                        <FiEye className="action-icon text-blue-500" />
                                                                    </span>
                                                                </Tippy>
                                                            </Link>
                                                            <Tippy content="Assign Expert">
                                                                <span>
                                                                    <BiUser
                                                                        className="action-icon text-blue-500"
                                                                        onClick={() => {
                                                                            setSelectedCase(data);
                                                                            assignExpert.current.open();
                                                                        }}
                                                                    />
                                                                </span>
                                                            </Tippy>
                                                            {!data?.invoice && (
                                                                <Tippy content="Manage Invoice">
                                                                    <span>
                                                                        <BiReceipt
                                                                            className="action-icon text-blue-500"
                                                                            onClick={() => {
                                                                                setSelectedCase(data);
                                                                                createInvoice.current.open();
                                                                            }}
                                                                        />
                                                                    </span>
                                                                </Tippy>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr className="pointer-events-none">
                                                <td colSpan={8} className="p-8">
                                                    <p className="mx-auto w-fit"> No data found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ) : (
                                    <TableLoader colspan={8} />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination
                    meta={meta}
                    prevNextPage={prevNextPage}
                    page={(value) => setParams({ ...params, per_page: value })}
                    goToPage={(value) => getCases(value)}
                />
            </div>

            <AssignExpert ref={assignExpert} caseData={selectedCase} refresh={getCases} />
            <CreateInvoiceModal ref={createInvoice} caseData={selectedCase} refresh={getCases} />
        </React.Fragment>
    );
};

// Index.middleware = {
//     auth: true,
// };

export default Index;
