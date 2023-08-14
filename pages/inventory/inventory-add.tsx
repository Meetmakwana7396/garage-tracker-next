import FieldButton from '@/components/Field/FieldButton';
import IconSearch from '@/components/Icon/IconSearch';
import Head from 'next/head';
import { Fragment } from 'react';

const InventoryAdd = () => {
    return (
        <Fragment>
            <Head>
                <title>Add Inventory | GT</title>
            </Head>
            <div className="space-y-10">
                {/* Page Title */}
                <div className="flex flex-wrap items-center pb-3 justify-between gap-4 border-b">
                    <h2 className="sm:text-5xl text-4xl tracking-wide font-semibold leading-none">
                        Add - Inventory Item
                    </h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
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

                <form className="mb-5 rounded-md border shadow bg-transparent p-4 dark:border-[#191e3a]">
                    <h1 className="mb-5 text-lg font-bold">Basic Information</h1>
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
                        <div>
                            <label className="form-label">Product Name</label>
                            <input
                                name="product_name"
                                type="text"
                                className="form-input"
                                placeholder="Product name..."
                            />
                        </div>

                        <div>
                            <label className="form-label">Product Number</label>
                            <input
                                name="product_number"
                                type="text"
                                className="form-input"
                                placeholder="Ex. P202300XX"
                            />
                        </div>

                        <div>
                            <label className="form-label">Car Model</label>
                            <input
                                name="car_model"
                                type="text"
                                className="form-input disabled:opacity-60 disabled:bg-black/20"
                                placeholder="Ex. Suzuki abc xli"
                                // disabled
                            />
                        </div>

                        <div>
                            <label className="form-label">Available Stock</label>
                            <input
                                name="car_model"
                                type="number"
                                className="form-input disabled:opacity-60 disabled:bg-black/20"
                                placeholder="Enter available stock in number..."
                                // disabled
                                min={0}
                            />
                        </div>

                        <div>
                            <label className="form-label">Minimum Stock Level</label>
                            <input
                                name="car_model"
                                type="number"
                                className="form-input disabled:opacity-60 disabled:bg-black/20"
                                placeholder="Enter minimum stock level in number..."
                                // disabled
                                min={0}
                            />
                        </div>

                        <div>
                            <label className="form-label">Purchase Date</label>
                            <input
                                name="car_model"
                                type="date"
                                className="form-input disabled:opacity-60 disabled:bg-black/20 picker"
                                placeholder="Enter price in number..."
                                // onClick={(e) => e.target.focus()} // disabled
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="form-label">Additional Notes</label>
                            <textarea
                                name="car_model"
                                rows={10}
                                className="form-input disabled:opacity-60 disabled:bg-black/20 picker"
                                placeholder="Additional notes about product..."
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="form-label">Additional Notes</label>
                            <div className="h-36 rounded border-2 border-dashed relative dark:border-black-more-light">
                                <p className="z-20 text-gray-500 w-fit text-xl">Click to insert image</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-3 z-20 sm:col-span-2 w-full bg-white text-right dark:bg-transparent">
                        <FieldButton type="submit" className="btn btn-primary">
                            Save
                        </FieldButton>
                    </div>
                    {/* <button>Hello</button> */}
                </form>

                <form className="mb-5 rounded-md border shadow bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                    <h1 className="mb-5 text-lg font-bold">Supplier Information</h1>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className="form-label">Supplier Name</label>
                            <input
                                name="product_name"
                                type="text"
                                className="form-input"
                                placeholder="Supplier Name..."
                            />
                        </div>

                        <div>
                            <label className="form-label">Supplier Phone Number</label>
                            <input
                                name="product_name"
                                type="text"
                                className="form-input"
                                placeholder="Supplier phone number..."
                            />
                        </div>
                    </div>
                    <div className="py-3 z-20 sm:col-span-2 w-full bg-white text-right dark:bg-transparent">
                        <FieldButton type="submit" className="btn btn-primary">
                            Save
                        </FieldButton>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default InventoryAdd;
