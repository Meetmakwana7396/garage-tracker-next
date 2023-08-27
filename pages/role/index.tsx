import IconSearch from '@/components/Icon/IconSearch';
import Head from 'next/head';
import { Fragment, useRef, useState } from 'react';
import TabBlock from '@/components/Layout/TabBlock';
import Th from '@/components/Table/Th';
import Pagination from '@/components/Essentials/Pagination';
import useSWRImmutable from 'swr/immutable';
import axios from '@/libs/axios';
import 'tippy.js/dist/tippy.css';
import Sheet from '@/components/Essentials/Sheet';
import AddUser from '@/components/User/AddUser';
import clsx from 'clsx';
import debounce from 'debounce';
import NoDataFound from '@/components/Essentials/NoDataFound';
import RoleRow from '@/components/Role/RoleRow';

const defaultFilters = {
    per_page: 10,
    order: 'DESC',
    order_field: 'id',
    search: '',
    page: 1,
    status: '',
};

const fetchRoles = async (url: any, params: any) => {
    try {
        const { data } = await axios.get(url, params);
        return data.data;
    } catch (error) {}
};

const UserIndex = () => {
    const addUserModal = useRef<any>(null);
    const [counts, setCounts] = useState(null);
    const [tabs, setTabs] = useState('all');
    const [filters, setFilters] = useState<any>(defaultFilters);

    const {
        data: Roles,
        isLoading,
        mutate,
    } = useSWRImmutable(['/roles', filters], ([url, filters]) => fetchRoles(url, { params: filters }));

    const manageSorting = (field: string) => {
        setFilters((prev: any) => ({ ...prev, order_field: field, order: prev.order === 'ASC' ? 'DESC' : 'ASC' }));
    };

    return (

        <Fragment>
            <Head>
                <title>User | GT</title>
            </Head>
            <div className="space-y-10">
                {/* Page Title*/}
                <div className="page-heading-bar">
                    <h2 className="page-heading">Roles</h2>
                </div>

                {/* Data Section  */}
                <div className="container max-w-[1600px]">
                    {/* Filters */}
                    <div className="flex justify-end mb-5">
                        <div className="flex gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Search..."
                                    onChange={debounce(
                                        (e: any) => setFilters({ ...filters, search: e.target.value }),
                                        500
                                    )}
                                />
                                <button
                                    type="button"
                                    className="text-black-dark absolute top-0 right-0 my-auto inline-flex h-10 w-10 items-center justify-center hover:opacity-70"
                                >
                                    <IconSearch />
                                </button>
                            </div>
                            <button
                                className="btn mx-auto btn-primary w-fit"
                                onClick={() => addUserModal.current.open()}
                            >
                                Add role
                            </button>
                        </div>
                    </div>
                    {!!Roles && !!Roles.data.length && (
                        <>
                            {/* Status Tabs  */}
                            <div className="overflow-auto w-full border border-b-0 dark:border-black-more-light">
                                <ul className="flex whitespace-nowrap gap-2 sm:flex dark:border-black-more-light">
                                    <TabBlock
                                        onClick={() => {
                                            setFilters({ ...filters, status: '' });
                                            setTabs('all');
                                        }}
                                        isActive={tabs === 'all'}
                                        count={counts && counts[1] + counts[2] + counts[3]}
                                        name="All"
                                    />
                                    <TabBlock
                                        onClick={() => {
                                            setFilters({ ...filters, status: 'ACTIVE' });
                                            setTabs('ACTIVE');
                                        }}
                                        isActive={tabs === 'ACTIVE'}
                                        count={counts && counts[2]}
                                        name="ACTIVE"
                                    />
                                    <TabBlock
                                        onClick={() => {
                                            setFilters({ ...filters, status: 'INACTIVE' });
                                            setTabs('INACTIVE');
                                        }}
                                        isActive={tabs === 'INACTIVE'}
                                        count={counts && counts[1]}
                                        name="INACTIVE"
                                    />
                                </ul>
                            </div>
                            {/* Table  */}
                            <div className="overflow-hidden p-0 mb-5">
                                <div className="table-responsive">
                                    <table
                                        className={clsx('table-hover', isLoading && 'opacity-50 pointer-events-none')}
                                    >
                                        <thead>
                                            <tr>
                                                <Th
                                                    isActive={filters?.order_field === 'id'}
                                                    isAscending={filters.order === 'ASC'}
                                                    onClick={() => manageSorting('id')}
                                                >
                                                    Role Id
                                                </Th>

                                                <Th
                                                    isActive={filters?.order_field === 'name'}
                                                    isAscending={filters.order === 'ASC'}
                                                    onClick={() => manageSorting('name')}
                                                >
                                                    Name
                                                </Th>

                                                <Th noSorting>Created At</Th>

                                                <Th
                                                    isActive={filters?.order_field === 'status'}
                                                    isAscending={filters.order === 'ASC'}
                                                    onClick={() => manageSorting('status')}
                                                >
                                                    Status
                                                </Th>
                                                <Th noSorting>Action</Th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Roles.data.length > 0 &&
                                                Roles.data.map((user: any) => (
                                                    <RoleRow data={user} key={user.id} refresh={mutate} />
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Pagination meta={Roles?.meta} setFilters={setFilters} />
                        </>
                    )}
                </div>

                {!!Roles && !!!Roles.data.length && <NoDataFound />}

                {/* {!Roles && <Loading />} */}

                <Sheet ref={addUserModal} width="600px">
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