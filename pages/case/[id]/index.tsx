import Header from '@/components/Layout/Header';
import Loading from '@/components/Loading';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

const Index = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [caseDetails, setCaseDetails] = useState<any>(null);

    const getCaseDetails = useCallback(async () => {
        try {
            if (id) {
                setIsLoading(true);
                const { data } = await axios.get(`/admin/cases/${id}`);
                setCaseDetails(data.data);
            }
        } catch (error) {}
        setIsLoading(false);
    }, [id]);

    useEffect(() => {
        getCaseDetails();
    }, [getCaseDetails]);

    return (
        <React.Fragment>
            <Head>
                <title>Case Details</title>
            </Head>
            <Header title={'Case Details'} />
            {!isLoading ? (
                <div className="p-6 px-5">
                    <div className="mb-4">
                        <button className="btn-back" onClick={() => router.back()}>
                            <HiChevronLeft className="action-icon hover:text-current mr-2" /> Back
                        </button>
                    </div>
                    <div className="space-y-4 xl:space-y-[30px]">
                        <div className="details-block">
                            <div className="mb-5 flex items-center gap-4">
                                <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark text-primary">
                                    Case Information
                                </h2>
                                {caseDetails?.status && (
                                    <div
                                        className={`status leading-5 capitalize status-${
                                            caseDetails && helper.getCaseStatus(caseDetails?.status)
                                        }`}
                                    >
                                        {caseDetails && helper.getCaseStatus(caseDetails?.status)}
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                                <div>
                                    <label className="form-label font-bold ">Case ID</label>
                                    <div className="leading-5">
                                        {caseDetails && `#${helper.isEmpty(caseDetails?.id)}`}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Attorney</label>
                                    <div className="leading-5">
                                        {caseDetails &&
                                            helper.isEmpty(
                                                caseDetails.attorney?.first_name + ' ' + caseDetails.attorney?.last_name
                                            )}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Expert</label>
                                    <div className="leading-5">
                                        {caseDetails &&
                                            helper.isEmpty(
                                                caseDetails.expert?.first_name + ' ' + caseDetails.expert?.last_name
                                            )}
                                    </div>
                                </div>

                                {/* <div>
                                <label className="form-label font-bold">Status</label>
                                <div
                                    className={`status leading-5 capitalize status-${
                                        caseDetails && helper.getCaseStatus(caseDetails?.status)
                                    }`}
                                    // className="status status-pending"
                                >
                                    {caseDetails && helper.getCaseStatus(caseDetails?.status)}
                                </div>{' '}
                            </div> */}

                                <div>
                                    <label className="form-label font-bold">Created At</label>
                                    <div className="leading-5">
                                        {caseDetails && helper.isEmpty(helper.formatDate(caseDetails?.needed_date))}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Trial Date</label>
                                    <div className="leading-5">
                                        {caseDetails && helper.isEmpty(helper.formatDate(caseDetails?.created_at))}
                                    </div>
                                </div>

                                <div className="">
                                    <label className="form-label font-bold">Needed Date</label>
                                    <div className="leading-5">
                                        {caseDetails && helper.isEmpty(helper.formatDate(caseDetails?.trial_date))}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-bold">Location</label>
                                    <div className="leading-5">
                                        {caseDetails &&
                                            helper.formatAddress(caseDetails?.city, caseDetails?.states?.name)}
                                    </div>
                                </div>

                                {caseDetails?.invoice?.invoice_url && (
                                    <div className="">
                                        <label className="form-label font-bold">Invoice</label>
                                        <div className="w-fit">
                                            <Link href={caseDetails?.invoice?.invoice_url} target="_blank">
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    className="h-20 w-20"
                                                    src="/assets/images/pdf.svg"
                                                    alt="CV"
                                                />
                                                <p className="text-center break-all w-20 text-primary font-semibold hover:underline">
                                                    Invoice
                                                </p>{' '}
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                <div className="col-span-4 ">
                                    <label className="form-label font-bold">Description</label>
                                    <div className="leading-5 whitespace-pre-wrap">
                                        {caseDetails && helper.isEmpty(caseDetails?.description)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {caseDetails?.attorney && (
                            <div className="details-block">
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark text-primary">
                                        Attorney Details
                                    </h2>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                                    <div className="">
                                        <label className="form-label font-bold">First Name</label>
                                        <div className="leading-5">
                                            {helper.isEmpty(caseDetails?.attorney?.first_name)}
                                        </div>
                                    </div>

                                    <div className="">
                                        <label className="form-label font-bold">Last Name</label>
                                        <div className="leading-5">
                                            {helper.isEmpty(caseDetails?.attorney?.last_name)}
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="form-label font-bold">Email</label>
                                        <div className="leading-5">{helper.isEmpty(caseDetails?.attorney?.email)}</div>
                                    </div>
                                    <div className="">
                                        <label className="form-label font-bold">License no</label>
                                        <div className="leading-5">
                                            {helper.isEmpty(caseDetails?.attorney?.attorney_license)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {caseDetails?.expert && (
                            <div className="details-block">
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark text-primary">
                                        Expert Details
                                    </h2>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                                    <div className="">
                                        <label className="form-label font-bold">First Name</label>
                                        <div className="leading-5">
                                            {helper.isEmpty(caseDetails?.expert?.first_name)}
                                        </div>
                                    </div>

                                    <div className="">
                                        <label className="form-label font-bold">Last Name</label>
                                        <div className="leading-5">
                                            {helper.isEmpty(caseDetails?.expert?.last_name)}
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label className="form-label font-bold">Email</label>
                                        <div className="leading-5">{helper.isEmpty(caseDetails?.expert?.email)}</div>
                                    </div>

                                    {caseDetails?.expert?.cv_url && (
                                        <div className="">
                                            <label className="form-label font-bold">CV</label>
                                            <div className="w-fit">
                                                <Link href={caseDetails?.expert?.cv_url} target="_blank">
                                                    <Image
                                                        width={30}
                                                        height={30}
                                                        className="h-20 w-20"
                                                        src="/assets/images/pdf.svg"
                                                        alt="CV"
                                                    />
                                                    <p className="text-center break-all w-20 text-primary font-semibold hover:underline">
                                                        CV
                                                    </p>{' '}
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {/* <div className="">
                            <label className="form-label font-bold">Free Schedule</label>
                            <div className="w-fit">
                                <Link href={caseDetails.expert.free_schedule_url} target="_blank">
                                    <Image
                                        width={30}
                                        height={30}
                                        className="h-20 w-20"
                                        src="/assets/images/pdf.svg"
                                        alt="CV"
                                    />
                                    <p className="text-center break-all w-20 text-primary font-semibold hover:underline">
                                        Free Schedule
                                    </p>{' '}
                                </Link>
                            </div>
                        </div> */}

                                    {/* <div className="">
                            <label className="form-label font-bold">Profile Picture</label>
                            <div className="w-fit">
                                <Link href={caseDetails?.expert?.profile_url || '#'} target="_blank">
                                    <Image
                                        width={30}
                                        height={30}
                                        className="h-20 w-20 border shadow"
                                        src={caseDetails?.expert?.profile_url}
                                        alt="No Profile Picture"
                                    />
                                </Link>
                            </div>
                        </div> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Index;

Index.middleware = {
    auth: true,
    // verify: true,
};
