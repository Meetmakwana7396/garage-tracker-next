import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Sheet from '../Essentials/Sheet';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '@/libs/axios';
import { attorneyStatus } from '@/libs/helper';
import { IEditAttorneyDetailForm, IEditAttorneyDetailModal } from '@/types/attorney';
import FieldButton from '../Field/FieldButton';
import Image from 'next/image';
import Loading from '../Essentials/Loading';

const EditAttorney = ({ selectedData, refresh, allAvailableStates }: IEditAttorneyDetailModal, forwardedRef: any) => {
    const modal = useRef<any>();
    const [profileObject, setProfileObject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [attorneyDetails, setAttorneyDetails] = useState<any>(null);

    useImperativeHandle(forwardedRef, () => ({
        open(id?: string) {
            reset();
            modal?.current?.open();
            if (id) {
                setSelectedId(id);
                getAttorneyDetails(id);
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    const { register, handleSubmit, formState, setValue, watch, reset } = useForm({
        defaultValues: {
            first_name: selectedData?.first_name || '',
            last_name: selectedData?.last_name || '',
            email: selectedData?.email || '',
            city: selectedData?.city || '',
            status: selectedData?.status?.toString() || 'default',
            state: selectedData?.state || '',
            phone: selectedData?.phone || '',
            zipcode: selectedData?.zipcode || '',
            attorney_license: selectedData?.attorney_license || '',
            profile: selectedData?.profile_url || '',
        },
    });
    let selectedProfile: any = watch('profile');

    const formHandler: SubmitHandler<IEditAttorneyDetailForm> = async (data) => {
        try {
            const fd = new FormData();
            fd.append('first_name', data.first_name);
            fd.append('last_name', data.last_name);
            fd.append('email', data.email);
            fd.append('city', data.city);
            fd.append('state', data.state);
            fd.append('zipcode', data.zipcode);
            fd.append('phone', data.phone);
            fd.append('attorney_license', data.attorney_license);
            fd.append('status', data.status);

            fd.append(
                'profile',
                profileObject
                    ? profileObject
                    : data?.profile === selectedData?.profile_url || attorneyDetails?.profile_url
                    ? ''
                    : data?.profile
            );
            fd.append('remove_profile', !data?.profile ? 'true' : 'false');

            await axios.post(`/admin/attorneys/${selectedData?.id || selectedId}`, fd);
            modal.current.close();
            if (refresh) {
                refresh();
            }
        } catch (error) {}
    };

    const handleImgChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setValue('profile', URL.createObjectURL(file));
            setProfileObject(file);
        }
    };

    const getAttorneyDetails = async (id: string) => {
        try {
            if (id) {
                setIsLoading(true);
                const { data } = await axios.get(`/admin/attorneys/${id}`);
                const attoreny_details = data.data;
                setAttorneyDetails(attoreny_details);
                setValue('first_name', attoreny_details?.first_name || '');
                setValue('last_name', attoreny_details?.last_name || '');
                setValue('email', attoreny_details?.email || '');
                setValue('phone', attoreny_details?.phone || '');
                setValue('status', attoreny_details?.status?.toString() || 'default');
                setValue('city', attoreny_details?.city || '');
                setValue('state', attoreny_details?.state || '');
                setValue('zipcode', attoreny_details?.zipcode || '');
                setValue('attorney_license', attoreny_details?.attorney_license || '');
                setValue('profile', attoreny_details?.profile_url || '');
            }
        } catch (error) {}
        setIsLoading(false);
    };

    return (
        <Sheet ref={modal}>
            {isLoading ? (
                <Loading message="loading..." /> //modal loader
            ) : (
                <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                    <h2 className="font-semibold text-lg">Attorney Details</h2>

                    <div className="grid sm:grid-cols-2 grid-cols-2 gap-4">
                        <div>
                            <label className="form-label text-sm" htmlFor="first_name">
                                First Name:
                            </label>
                            <input
                                {...register('first_name')}
                                id="first_name"
                                type="text"
                                className="form-input"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div>
                            <label className="form-label text-sm" htmlFor="last_name">
                                Last Name:
                            </label>
                            <input
                                {...register('last_name')}
                                id="last_name"
                                type="text"
                                className="form-input"
                                placeholder="Enter Last Name"
                            />
                        </div>

                        <div>
                            <label className="form-label text-sm" htmlFor="email">
                                Email:
                            </label>
                            <input
                                {...register('email')}
                                id="email"
                                type="text"
                                className="form-input disabled:opacity-60 disabled:bg-black/20"
                                placeholder="Enter Email"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="form-label text-sm" htmlFor="status">
                                Status:
                            </label>
                            <select
                                {...register('status')}
                                placeholder="Select Status"
                                className="form-select capitalize"
                                id="status"
                            >
                                <option key="0" value="default">
                                    Select Status
                                </option>
                                {attorneyStatus.map((status) => (
                                    <option key={status.key} className="capitalize" value={status.key}>
                                        {status.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label text-sm" htmlFor="city">
                                City:
                            </label>
                            <input
                                {...register('city')}
                                id="city"
                                type="text"
                                className="form-input"
                                placeholder="Enter City"
                            />
                        </div>

                        <div className="">
                            <label className="form-label text-sm" htmlFor="state">
                                State:
                            </label>
                            <select
                                {...register('state')}
                                placeholder="Select State"
                                className="form-select capitalize"
                                id="state"
                            >
                                <option key="0" value="">
                                    Select State
                                </option>
                                {allAvailableStates &&
                                    allAvailableStates.map((state: any) => (
                                        <option key={state.id} className="capitalize" value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="form-label text-sm" htmlFor="zipcode">
                                Zipcode:
                            </label>
                            <input
                                {...register('zipcode')}
                                id="zipcode"
                                type="text"
                                className="form-input"
                                placeholder="Enter Zipcode"
                            />
                        </div>

                        <div>
                            <label className="form-label text-sm" htmlFor="phone">
                                Phone:
                            </label>
                            <input
                                {...register('phone')}
                                id="phone"
                                type="text"
                                className="form-input"
                                placeholder="Enter Phone"
                            />
                        </div>

                        <div>
                            <label className="form-label text-sm" htmlFor="name">
                                Attorney License:
                            </label>
                            <input
                                {...register('attorney_license')}
                                id="name"
                                type="text"
                                className="form-input"
                                placeholder="License Number"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="form-label text-sm" htmlFor="status">
                                Profile Picture:
                            </label>

                            {!selectedProfile && (
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file3"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <BiUpload className="text-slate-400 h-8 w-8" />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to Upload File.</span>
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file3"
                                            {...register('profile')}
                                            type="file"
                                            className="hidden"
                                            onChange={handleImgChange}
                                        />
                                    </label>
                                </div>
                            )}
                            {selectedProfile && (
                                <div className="h-auto relative w-fit py-4">
                                    <BiX
                                        className="bg-danger absolute top-2 cursor-pointer -left-2 rounded-full text-white"
                                        onClick={() => {
                                            setValue('profile', '');
                                            setProfileObject('');
                                        }}
                                    />
                                    <Image
                                        height={100}
                                        width={70}
                                        src={selectedProfile}
                                        className="object-cover w-auto border shadow h-auto max-h-40 max-w-auto"
                                        alt=""
                                    />
                                    <p className="break-all text-center text-xs"> {selectedProfile[0]?.name}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <FieldButton loading={formState.isSubmitting} type="submit" className="btn btn-primary ml-auto">
                        Submit
                    </FieldButton>
                </form>
            )}
        </Sheet>
    );
};

export default forwardRef(EditAttorney);
