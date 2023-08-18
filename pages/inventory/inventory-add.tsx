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
                <div className="page-heading-bar">
                    <h2 className="page-heading">Add - Inventory Item</h2>
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <form className="styled-form">
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
                        <div className="mt-4 z-20 sm:col-span-2 w-full bg-white text-right dark:bg-transparent flex justify-between">
                            <FieldButton type="submit" className="btn btn-primary">
                                Save
                            </FieldButton>
                        </div>
                        {/* <button>Hello</button> */}
                    </form>

                    <form className="styled-form">
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
                        <div className="mt-4 z-20 sm:col-span-2 w-full bg-white text-right dark:bg-transparent flex justify-between">
                            <FieldButton type="submit" className="btn btn-primary">
                                Save
                            </FieldButton>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default InventoryAdd;
