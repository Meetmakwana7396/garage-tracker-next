import IconDashboard from '@/components/Icon/IconDashboard';
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

    return (
        <React.Fragment>
            <Head>
                <title>Dashboard</title>
            </Head>
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
            </div>
        </React.Fragment>
    );
};

export default Index;

// Index.middleware = {
//     auth: true,
// };
