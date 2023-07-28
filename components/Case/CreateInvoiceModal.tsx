import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '@/libs/axios';
import { caseStatus, invoiceStatus } from '@/libs/helper';
import Modal from '../Modal';
import { ICreateInvoiceForm, ICreateInvoiceModal } from '@/types/case';
import FieldButton from '../Field/FieldButton';
import { BiUpload, BiX } from 'react-icons/bi';
import Image from 'next/image';
import Sheet from '../Sheet';

const AssignExpert = ({ caseData, refresh }: ICreateInvoiceModal, forwardedRef: any) => {
    const modal = useRef<any>();
    const { register, handleSubmit, formState, setValue, reset, watch } = useForm({
        defaultValues: {
            title: '',
            status: 'default',
            amount: '',
            invoice: '',
            due_date: '',
            notes: '',
        },
    });
    let selectedInvoice: any = watch('invoice');

    useImperativeHandle(forwardedRef, () => ({
        open() {
            reset();
            modal?.current?.open();
        },
        close() {
            reset();
            modal?.current?.close();
        },
    }));

    const formHandler: SubmitHandler<ICreateInvoiceForm> = async (data: any) => {
        const fd = new FormData();
        fd.append('title', data?.title);
        fd.append('status', data?.status);
        fd.append('due_date', data?.due_date);
        fd.append('notes', data?.notes);
        if (data?.invoice) fd.append('invoice', data?.invoice ? data?.invoice[0] : data?.invoice);
        fd.append('amount', data?.amount);

        try {
            await axios.post(`/admin/cases/${caseData?.id}/invoice/create`, fd);
            modal.current.close();
            if (refresh) {
                refresh();
            }
        } catch (error) {}
    };

    // useEffect(() => {
    //     if (caseData) {
    //         setValue('expert_id', caseData.expert.id);
    //         setValue('status', caseData.status);
    //         setValue('title', caseData.title);
    //     }
    // }, [caseData, setValue]);

    return (
        <Sheet ref={modal}>
            <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                <h2 className="font-semibold text-lg">Manage Invoice</h2>

                <div>
                    <label className="form-label text-sm" htmlFor="title">
                        Invoice Title:
                    </label>
                    <input
                        {...register('title')}
                        placeholder="Enter Title"
                        className="form-input capitalize"
                        id="title"
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
                        {invoiceStatus.map((status) => (
                            <option key={status.key} className="capitalize" value={status.key}>
                                {status.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="form-label text-sm" htmlFor="amount">
                        Amount:
                    </label>
                    <input
                        {...register('amount')}
                        placeholder="Enter Amount"
                        className="form-input capitalize"
                        id="amount"
                    />
                </div>

                <div>
                    <label className="form-label text-sm" htmlFor="due_date">
                        Due Date:
                    </label>
                    <input
                        {...register('due_date')}
                        type="date"
                        placeholder="Enter Amount"
                        className="form-input"
                        id="due_date"
                    />
                </div>

                <div className="col-span-2">
                    <label className="form-label text-sm" htmlFor="status">
                        Invoice:
                    </label>

                    {!selectedInvoice && (
                        <div className="flex items-center  justify-center w-full">
                            <label
                                htmlFor="dropzone-file2"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <BiUpload className="text-slate-400 h-8 w-8" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to Upload File.</span>
                                    </p>
                                </div>
                                <input {...register('invoice')} id="dropzone-file2" type="file" className="hidden" />
                            </label>
                        </div>
                    )}
                    {selectedInvoice && (
                        <div className="h-auto relative w-fit py-4">
                            <BiX
                                className="bg-danger absolute top-2 cursor-pointer rounded-full text-white"
                                onClick={() => setValue('invoice', '')}
                            />

                            <Image
                                height={100}
                                width={70}
                                src="/assets/images/pdf.svg"
                                className="object-cover"
                                alt=""
                            />
                            <p className="break-all text-center text-xs"> {selectedInvoice[0]?.name}</p>
                        </div>
                    )}
                </div>

                <div>
                    <label className="form-label text-sm" htmlFor="notes">
                        Notes:
                    </label>
                    <textarea
                        {...register('notes')}
                        placeholder="Notes to keep"
                        rows={4}
                        cols={50}
                        className="form-input"
                        id="notes"
                    />
                </div>

                <FieldButton loading={formState.isSubmitting} type="submit" className="btn btn-primary ml-auto">
                    Submit
                </FieldButton>
            </form>
        </Sheet>
    );
};

export default forwardRef(AssignExpert);
