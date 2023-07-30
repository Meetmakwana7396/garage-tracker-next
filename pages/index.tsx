import IconDashboard from '@/components/Icon/IconDashboard';
import Header from '@/components/Layout/Header';
import axios from '@/libs/axios';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Index = () => {
    const [allCounts, setAllCounts] = useState<any>(null);

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get('/admin/dashboard');
            setAllCounts(data.data);
        } catch (error) {}
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Header title="Dashboard" />
            <div className="p-6 px-5 text-white">
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    {/* Expert  */}
                    <Link href="/expert">
                        <div className="dashboard-panels bg-gradient-to-r from-cyan-500 to-cyan-400 ">
                            <div className="icon-box">
                                <IconDashboard className="w-16 h-16 opacity-60 " />
                            </div>
                            <div className="text-right">
                                <p className="mt-4 text-4xl font-bold ">
                                    {allCounts
                                        ? allCounts?.expertData[1] + allCounts?.expertData[2] + allCounts?.expertData[3]
                                        : 0}
                                </p>
                                <p className="font-bold text-md"> Experts</p>
                            </div>
                        </div>
                    </Link>

                    {/* Attorney */}
                    <Link href="/attorney">
                        <div className="dashboard-panels bg-gradient-to-r from-purple-500 to-purple-400 ">
                            <div className="icon-box">
                                <IconDashboard className="w-16 h-16 opacity-60 " />
                            </div>
                            <div className="text-right">
                                <p className="mt-4 text-4xl font-bold ">
                                    {allCounts
                                        ? allCounts?.attorneyData[1] +
                                          allCounts?.attorneyData[2] +
                                          allCounts?.attorneyData[3]
                                        : 0}
                                </p>
                                <p className="font-bold text-md"> Attorneys</p>
                            </div>
                        </div>
                    </Link>

                    {/*  Cases */}
                    <Link href="/case">
                        <div className="dashboard-panels bg-gradient-to-r from-blue-500 to-blue-400">
                            <div className="icon-box">
                                <IconDashboard className="w-16 h-16 opacity-60 " />
                            </div>
                            <div className="text-right">
                                <p className="mt-4 text-4xl font-bold ">
                                    {allCounts
                                        ? allCounts?.caseData[1] + allCounts?.caseData[2] + allCounts?.caseData[3]
                                        : 0}
                                </p>
                                <p className="font-bold text-md"> Cases</p>
                            </div>
                        </div>
                    </Link>

                    {/* Invoices */}
                    <Link href="/invoice">
                        <div className="dashboard-panels bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                            <div className="icon-box">
                                <IconDashboard className="w-16 h-16 opacity-60 " />
                            </div>
                            <div className="text-right">
                                <p className="mt-4 text-4xl font-bold ">
                                    {allCounts
                                        ? allCounts?.invoiceData[1] +
                                          allCounts?.invoiceData[2] +
                                          allCounts?.invoiceData[3]
                                        : 0}
                                </p>
                                <p className="font-bold text-md"> Invoices</p>
                            </div>
                        </div>
                    </Link>

                    {/* Specialty */}
                    <Link href="/specialty">
                        <div className="dashboard-panels bg-gradient-to-r from-orange-500 to-orange-400">
                            <div className="icon-box">
                                <IconDashboard className="w-16 h-16 opacity-60 " />
                            </div>
                            <div className="text-right">
                                <p className="mt-4 text-4xl font-bold ">
                                    {allCounts
                                        ? allCounts?.specialtyData[1] +
                                          allCounts?.specialtyData[2] +
                                          allCounts?.specialtyData[3]
                                        : 0}
                                </p>
                                <p className="font-bold text-md"> Specialties</p>
                            </div>
                        </div>
                    </Link>

                    {/* Sub-Specialty */}
                    <Link href="/sub-specialty">
                        <div className="dashboard-panels bg-gradient-to-r from-green-500 to-green-400">
                            <div className="icon-box">
                                <IconDashboard className="w-16 h-16 opacity-60 " />
                            </div>
                            <div className="text-right">
                                <p className="mt-4 text-4xl font-bold ">
                                    {allCounts
                                        ? allCounts?.subspecialtyData[1] +
                                          allCounts?.subspecialtyData[2] +
                                          allCounts?.subspecialtyData[3]
                                        : 0}
                                </p>
                                <p className="font-bold text-md"> Sub-Specialties</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="grid gap-6 xl:grid-flow-row text-black">
                        <div className="dashboard-panels overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-md font-bold">Specialty Analytics</div>
                                    <div className="text-success"> Paid on June 27, 2022 </div>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 h-24 w-24 ltr:-right-12 rtl:-left-12">
                                    <svg
                                        className="h-full w-full text-success opacity-20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            opacity="0.5"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M8.5 12.5L10.5 14.5L15.5 9.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                    <div>
                                        <div className="text-primary">Card Limit</div>
                                        <div className="mt-2 text-2xl font-semibold">$50,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Spent</div>
                                        <div className="mt-2 text-2xl font-semibold">$15,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Minimum</div>
                                        <div className="mt-2 text-2xl font-semibold">$2,500.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-panels overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-lg font-bold">Sub-Specialty Analytics</div>
                                    <div className="text-danger"> Must be paid before July 27, 2022 </div>
                                </div>
                            </div>
                            <div className="relative mt-10">
                                <div className="absolute -bottom-12 h-24 w-24 ltr:-right-12 rtl:-left-12">
                                    <svg
                                        className="h-full w-24 text-danger opacity-20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            opacity="0.5"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M12 7V13"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                                    </svg>
                                </div>

                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                    <div>
                                        <div className="text-primary">Card Limit</div>
                                        <div className="mt-2 text-2xl font-semibold">$50,000.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Spent</div>
                                        <div className="mt-2 text-2xl font-semibold">$30,500.00</div>
                                    </div>
                                    <div>
                                        <div className="text-primary">Minimum</div>
                                        <div className="mt-2 text-2xl font-semibold">$8,000.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-panels h-full text-black">
                        <div className="mb-5 flex items-start justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Visitors by Browser</h5>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <div className="flex items-center">
                                <div className="h-9 w-9">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <circle opacity="0.5" cx="12" cy="12" r="4"></circle>
                                            <line opacity="0.5" x1="21.17" y1="8" x2="12" y2="8"></line>
                                            <line opacity="0.5" x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                                            <line opacity="0.5" x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full flex-initial px-3">
                                    <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                        <h6>Chrome</h6>
                                        <p className="text-xs ltr:ml-auto rtl:mr-auto">65%</p>
                                    </div>
                                    <div>
                                        <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="relative h-full w-full rounded-full bg-gradient-to-r from-[#009ffd] to-[#2a2a72] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                style={{ width: '65%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                opacity="0.5"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M13.024 14.5601C10.7142 15.484 9.5593 15.946 8.89964 15.4977C8.74324 15.3914 8.60834 15.2565 8.50206 15.1001C8.0538 14.4405 8.51575 13.2856 9.43967 10.9758C9.63673 10.4831 9.73527 10.2368 9.90474 10.0435C9.94792 9.99429 9.99429 9.94792 10.0435 9.90474C10.2368 9.73527 10.4831 9.63673 10.9758 9.43966C13.2856 8.51575 14.4405 8.0538 15.1001 8.50206C15.2565 8.60834 15.3914 8.74324 15.4977 8.89964C15.946 9.5593 15.484 10.7142 14.5601 13.024C14.363 13.5166 14.2645 13.763 14.095 13.9562C14.0518 14.0055 14.0055 14.0518 13.9562 14.095C13.763 14.2645 13.5166 14.363 13.024 14.5601Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full flex-initial px-3">
                                    <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                        <h6>Safari</h6>
                                        <p className="text-xs ltr:ml-auto rtl:mr-auto">40%</p>
                                    </div>
                                    <div>
                                        <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="relative h-full w-full rounded-full bg-gradient-to-r from-[#a71d31] to-[#3f0d12] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                style={{ width: '40%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning/10 text-warning dark:bg-warning dark:text-white-light">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.5"
                                                d="M2 12H22M16 12C16 13.3132 15.8965 14.6136 15.6955 15.8268C15.4945 17.0401 15.1999 18.1425 14.8284 19.0711C14.457 19.9997 14.016 20.7362 13.5307 21.2388C13.0454 21.7413 12.5253 22 12 22C11.4747 22 10.9546 21.7413 10.4693 21.2388C9.98396 20.7362 9.54301 19.9997 9.17157 19.0711C8.80014 18.1425 8.5055 17.0401 8.30448 15.8268C8.10346 14.6136 8 13.3132 8 12C8 10.6868 8.10346 9.38642 8.30448 8.17316C8.5055 6.95991 8.80014 5.85752 9.17157 4.92893C9.54301 4.00035 9.98396 3.26375 10.4693 2.7612C10.9546 2.25866 11.4747 2 12 2C12.5253 2 13.0454 2.25866 13.5307 2.76121C14.016 3.26375 14.457 4.00035 14.8284 4.92893C15.1999 5.85752 15.4945 6.95991 15.6955 8.17317C15.8965 9.38642 16 10.6868 16 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.76121 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L22 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full flex-initial px-3">
                                    <div className="w-summary-info mb-1 flex justify-between font-semibold text-white-dark">
                                        <h6>Others</h6>
                                        <p className="text-xs ltr:ml-auto rtl:mr-auto">25%</p>
                                    </div>
                                    <div>
                                        <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
                                            <div
                                                className="relative h-full w-full rounded-full bg-gradient-to-r from-[#fe5f75] to-[#fc9842] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
                                                style={{ width: '25%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </React.Fragment>
    );
};

export default Index;

// Index.middleware = {
//     auth: true,
// };
