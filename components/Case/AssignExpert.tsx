import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '@/libs/axios';
import { caseStatus } from '@/libs/helper';
import Modal from '../Modal';
import { IAssignExpertForm, IAssignExpertModal } from '@/types/case';
import ExpertListDropdown from './ExpertListDropdown';
import FieldButton from '../Field/FieldButton';

const AssignExpert = ({ caseData, refresh }: IAssignExpertModal, forwardedRef: any) => {
    const modal = useRef<any>();
    const expertField = useRef<any>();
    const [selectedExpert, setSelectedExpert] = useState({});
    const { register, handleSubmit, formState, setValue, reset } = useForm({
        defaultValues: {
            title: '',
            status: 'default',
            expert_id: '',
        },
    });

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
        },
        close() {
            // reset();
            modal?.current?.close();
        },
    }));

    const parentCallback = (value: any) => {
        setSelectedExpert(value);
        setValue('expert_id', value);
    };

    const formHandler: SubmitHandler<IAssignExpertForm> = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append('expert_id', data.expert_id);
            formdata.append('title', data.title);
            formdata.append('status', data.status);

            await axios.post(`/admin/cases/${caseData?.id}/update`, formdata);
            modal.current.close();
            if (refresh) {
                refresh();
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (caseData) {
            setValue('expert_id', caseData.expert?.id);
            setValue('status', caseData.status);
            setValue('title', caseData.title);
            setSelectedExpert(caseData.expert?.id);
        }
    }, [caseData, setValue]);

    return (
        <Modal ref={modal}>
            <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                <h2 className="font-semibold text-lg">Assign Expert</h2>

                <div>
                    <label className="form-label text-sm" htmlFor="title">
                        Case Title:
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
                        {caseStatus.map((status) => (
                            <option key={status.key} className="capitalize" value={status.key}>
                                {status.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="">
                    <label className="form-label text-sm">Experts:</label>
                    <ExpertListDropdown
                        ref={expertField}
                        selectedOption={selectedExpert}
                        parentCallback={(value: any) => parentCallback(value)}
                    />
                </div>

                <FieldButton loading={formState.isSubmitting} type="submit" className="btn btn-primary ml-auto">
                    Submit
                </FieldButton>
            </form>
        </Modal>
    );
};

export default forwardRef(AssignExpert);
