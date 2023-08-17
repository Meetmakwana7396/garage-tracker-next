import IconSearch from '@/components/Icon/IconSearch';
import Head from 'next/head';
import { Fragment, useRef, useState } from 'react';
import TabBlock from '@/components/Layout/TabBlock';
import Th from '@/components/Table/Th';
import Pagination from '@/components/Essentials/Pagination';
import clsx from 'clsx';
import IconCard from '@/components/Icon/IconCard';
import IconList from '@/components/Icon/IconList';
import useSWRImmutable from 'swr/immutable';
import axios from '@/libs/axios';
import UserRow from '@/components/User/UserRow';
import Loading from '@/components/Essentials/Loading';
import Image from 'next/image';
import 'tippy.js/dist/tippy.css';
import Sheet from '@/components/Essentials/Sheet';
import AddUser from '@/components/User/AddUser';

const defaultFilters = {
    per_page: 10,
    order: 'DESC',
    order_field: 'id',
    filter: '',
    page: 1,
};

const fetchUserList = async (url: any, filters: any) => {
    try {
        const { data } = await axios.get(url, filters);
        return data.data;
    } catch (error) {}
};

const UserIndex = () => {
    const addUserModal = useRef<any>(null);
    const [counts, setCounts] = useState(null);
    const [tabs, setTabs] = useState('all');
    const [filters, setFilters] = useState(defaultFilters);
    const [layout, setLayout] = useState('card');

    const {
        data: UserList,
        isLoading,
        mutate,
    } = useSWRImmutable(['/users', filters], ([url, filters]) => fetchUserList(url, { params: filters }));

    return (
        <Fragment>
            <Head>
                <title>Inventory | GT</title>
            </Head>
            <div className="space-y-10">
                {/* Page Title*/}
                <div className="page-heading-bar">
                    <h2 className="page-heading">Users</h2>
                    <div>
                        {!!UserList?.data?.length && (
                            <button
                                className="btn mx-auto btn-primary w-fit"
                                onClick={() => addUserModal.current.open()}
                            >
                                Add user
                            </button>
                        )}
                    </div>
                </div>

                {/* Data Section  */}
                {!!UserList?.data?.length ? (
                    <div className="container max-w-[1600px]">
                        {/* Filters */}
                        <div className="flex justify-between mb-5">
                            <div className=" flex rounded border dark:border-transparent dark:bg-black-light overflow-hidden p-1">
                                <div
                                    className={clsx(
                                        'py-2 px-2 rounded-[2px] cursor-pointer text-gray-500',
                                        layout === 'card' && 'bg-supporting dark:bg-black'
                                    )}
                                    onClick={() => setLayout('card')}
                                >
                                    <IconCard className="w-4 h-4" />
                                </div>
                                <div
                                    className={clsx(
                                        'p-2 rounded-[2px] cursor-pointer text-gray-500',
                                        layout === 'table' && 'bg-supporting dark:bg-black'
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
                                    value={filters.filter}
                                    onChange={(e) => setFilters({ ...filters, filter: e.target.value })}
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
                        <div className="overflow-auto w-full border border-b-0 dark:border-black-more-light">
                            <ul className="flex whitespace-nowrap gap-2 sm:flex dark:border-black-more-light">
                                <TabBlock
                                    onClick={() => {
                                        // setFilters({ ...filters, status: '' });
                                        setTabs('all');
                                    }}
                                    isActive={tabs === 'all'}
                                    count={counts && counts[1] + counts[2] + counts[3]}
                                    name="All"
                                />
                                <TabBlock
                                    onClick={() => {
                                        // setFilters({ ...filters, status: '2' });
                                        setTabs('approved');
                                    }}
                                    isActive={tabs === 'approved'}
                                    count={counts && counts[2]}
                                    name="Approved"
                                />
                                <TabBlock
                                    onClick={() => {
                                        // setFilters({ ...filters, status: '1' });
                                        setTabs('pending');
                                    }}
                                    isActive={tabs === 'pending'}
                                    count={counts && counts[1]}
                                    name="Pending"
                                />
                                <TabBlock
                                    onClick={() => {
                                        // setFilters({ ...filters, status: '4' });
                                        setTabs('deleted');
                                    }}
                                    isActive={tabs === 'deleted'}
                                    count={counts && counts[4]}
                                    name="Rejected"
                                />
                            </ul>
                        </div>

                        {/* Table  */}
                        <div className="overflow-hidden p-0 mb-5">
                            <div className="table-responsive">
                                <table className={`table-hover  ${isLoading && 'opacity-50 pointer-events-none'}`}>
                                    <thead>
                                        <tr>
                                            <Th
                                                isActive={filters?.order_field === 'id'}
                                                isAscending={filters.order === 'asc'}
                                            >
                                                User Id
                                            </Th>
                                            <Th
                                                isActive={filters?.order_field === 'first_name'}
                                                isAscending={filters.order === 'asc'}
                                            >
                                                Name
                                            </Th>

                                            <Th noSorting>Email</Th>
                                            <Th
                                                isActive={filters?.order_field === 'created_at'}
                                                isAscending={filters.order === 'asc'}
                                            >
                                                Created At
                                            </Th>
                                            <Th
                                                isActive={filters?.order_field === 'status'}
                                                isAscending={filters.order === 'asc'}
                                            >
                                                Status
                                            </Th>
                                            <Th noSorting>Action</Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {UserList?.data?.length > 0 &&
                                            UserList.data.map((user: any) => (
                                                <UserRow data={user} key={user.id} refresh={mutate} />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination meta={UserList?.meta} setFilters={setFilters} />
                    </div>
                ) : (
                    <div className="h-[calc(100vh-220px)] flex items-center justify-center text-center">
                        <div className="space-y-5">
                            <Image
                                src="/assets/images/empty.jpg"
                                height={100}
                                width={200}
                                className="h-44 mx-auto w-44"
                                alt="no data found"
                            />
                            <h2 className="text-3xl font-semibold">No users are added yet</h2>
                            <span className="text-gray-500 text-xl">Add few users to get started</span>
                            <button
                                className="btn mx-auto btn-primary w-fit"
                                onClick={() => addUserModal.current.open()}
                            >
                                Add user
                            </button>
                        </div>
                    </div>
                )}

                {isLoading && <Loading />}

                <Sheet ref={addUserModal} width='600px'>
                    <AddUser
                        refresh={() => {
                            mutate();
                            addUserModal.current.close();
                        }}
                        close={() => addUserModal.current.close()}
                    />
                </Sheet>
            </div>
        </Fragment>
    );
};

export default UserIndex;

UserIndex.middleware = {
    auth: true,
};
