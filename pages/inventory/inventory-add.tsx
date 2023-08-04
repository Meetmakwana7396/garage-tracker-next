import IconSearch from '@/components/Icon/IconSearch';
import Footer from '@/components/Layout/Footer';
import Head from 'next/head';
import React from 'react';

const InventoryAdd = () => {
    return (
        <React.Fragment>
            <Head>
                <title>Add Inventory | GT</title>
            </Head>
            <div className="space-y-10">
                {/* Table filters  */}
                <div className="flex flex-wrap items-center pb-3 justify-between gap-4 border-b">
                    <h2 className="text-5xl tracking-wide text-gray-400 font-semibold leading-none">
                        Add - Inventory Item
                    </h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                        <div className="">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pr-10"
                                    placeholder="Search..."
                                    // value={params.filter}
                                    // onChange={(e) => setParams({ ...params, filter: e.target.value })}
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
            </div>
        </React.Fragment>
    );
};

export default InventoryAdd;
