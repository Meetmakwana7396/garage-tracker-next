import EditAttorney from '@/components/Attorney/EditAttorney';
import Header from '@/components/Layout/Header';
import Loading from '@/components/Loading';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Tippy from '@tippyjs/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { HiChevronLeft } from 'react-icons/hi';
import 'tippy.js/dist/tippy.css';

const Index = () => {
    const router = useRouter();
    const { id } = router.query;
    const editAttorneyModal = useRef<any>();
    const [attorneyDetails, setAttorneyDetails] = useState<any>(null);
    const [states, setsStates] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAttorneyDetails = useCallback(async () => {
        try {
            if (id) {
                setIsLoading(true);
                const { data } = await axios.get(`/admin/attorneys/${id}`);
                setAttorneyDetails(data.data);
            }
        } catch (error) {}
        setIsLoading(false);
    }, [id]);

    const getStates = async () => {
        try {
            const { data } = await axios.get('/admin/states/list');
            setsStates(data.dataset);
        } catch (error) {}
    };

    useEffect(() => {
        getAttorneyDetails();
        getStates();
    }, [getAttorneyDetails]);

    return (
        <React.Fragment>
            <Head>
                <title>Attorney Details</title>
            </Head>
            <Header title={'Attorney Details'} />
            {!isLoading ? (
                <div className="p-6 px-5">
                    <div className="mb-4">
                        <button className="btn-back" onClick={() => router.back()}>
                            <HiChevronLeft className="action-icon hover:text-current" /> Back
                        </button>
                    </div>
                    <div className="space-y-4 xl:space-y-[30px]">
                        <div className="details-block">
                            <div className="mb-5 flex items-center gap-4">
                                <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark text-primary">
                                    Attorney Information
                                </h2>

                                {attorneyDetails?.status && (
                                    <div
                                        className={`status leading-5 capitalize status-${
                                            attorneyDetails && helper.getAttorneyStatus(attorneyDetails.status)
                                        }`}
                                    >
                                        {attorneyDetails && helper.getAttorneyStatus(attorneyDetails.status)}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="text-primary hover:text-black"
                                    onClick={() => editAttorneyModal.current.open()}
                                >
                                    <Tippy content="Edit Details">
                                        <span>
                                            <BiEdit className="action-icon text-blue-500" />
                                        </span>
                                    </Tippy>
                                </button>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                                <div>
                                    <label className="form-label font-bold">First Name</label>
                                    <div className="leading-5">
                                        {attorneyDetails && helper.isEmpty(attorneyDetails.first_name)}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Last Name</label>
                                    <div className="leading-5">
                                        {attorneyDetails && helper.isEmpty(attorneyDetails.last_name)}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Email</label>

                                    <div className="leading-5">
                                        {attorneyDetails && helper.isEmpty(attorneyDetails.email)}
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label font-bold">Phone</label>

                                    <div className="leading-5">
                                        {attorneyDetails && helper.isEmpty(attorneyDetails.phone)}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Created At</label>
                                    <div className="leading-5">
                                        {attorneyDetails &&
                                            helper.isEmpty(helper.formatDate(attorneyDetails.created_at))}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Location</label>
                                    <div className="leading-5">
                                        {attorneyDetails &&
                                            helper.formatAddress(
                                                attorneyDetails?.city,
                                                attorneyDetails?.states?.name,
                                                attorneyDetails?.zipcode
                                            )}
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label font-bold">Attorney License</label>
                                    <div className="leading-5">
                                        {attorneyDetails && helper.isEmpty(attorneyDetails.attorney_license)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="details-block">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="inline-flex items-center gap-3 text-lg font-semibold text-black-dark text-primary">
                                    Other
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
                                {attorneyDetails?.profile_url && (
                                    <div className="">
                                        <label className="form-label font-bold">Profile Picture</label>
                                        <div className="h-auto relative w-fit ">
                                            <Link
                                                href={attorneyDetails?.profile_url || '/assets/images/user-profile.png'}
                                                target="_blank"
                                            >
                                                <Image
                                                    height={80}
                                                    width={80}
                                                    src={
                                                        attorneyDetails?.profile_url ||
                                                        '/assets/images/user-profile.png'
                                                    }
                                                    className="object-cover w-auto border shadow h-auto max-h-[80px]"
                                                    alt="profile pic"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <EditAttorney
                        ref={editAttorneyModal}
                        allAvailableStates={states}
                        selectedData={attorneyDetails}
                        refresh={getAttorneyDetails}
                    />
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
