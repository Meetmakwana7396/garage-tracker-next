import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Sheet from '../Essentials/Sheet';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from '@/libs/axios';
import { IAddSpecialityForm, IAddSpecialityModal } from '@/types/speciality';
import { specialtyStatus } from '@/libs/helper';

const AddSpeciality = ({ refresh }: IAddSpecialityModal, forwardedRef: any) => {
    const modal = useRef<any>();
    const [specialtyData, setSpecialtyData] = useState<any>(null);
    const { register, handleSubmit, formState, setValue, reset } = useForm({
        defaultValues: {
            name: '',
            status: 'default',
        },
    });

    useImperativeHandle(forwardedRef, () => ({
        open(selectedData: any) {
            reset();
            modal?.current?.open();
            setSpecialtyData(null);
            if (selectedData) {
                setSpecialtyData(selectedData);
                setValue('name', selectedData?.name || '');
                setValue('status', selectedData?.status.toString() || 'default');
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    // useEffect(() => {
    //         setValue('name', selectedData?.name || '');
    //         setValue('status', selectedData?.status.toString() || 'default');
    // }, [selectedData, reset,setValue]);

    const formHandler: SubmitHandler<IAddSpecialityForm> = async (data) => {
        try {
            if (specialtyData) {
                await axios.put(`/admin/specialties/${specialtyData.id}`, data);
            } else {
                await axios.post('/admin/specialties', data);
            }
            modal.current.close();
            if (refresh) {
                refresh();
            }
        } catch (error) {}
    };

    return (
        <Sheet ref={modal}>
            <form className="space-y-5" onSubmit={handleSubmit(formHandler)}>
                <h2 className="font-semibold">{specialtyData ? 'Edit Speciality' : 'Add Speciality'}</h2>
                <div>
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        {...register('name')}
                        name="name"
                        id="name"
                        type="text"
                        className="form-input"
                        placeholder="Enter Speciality"
                    />
                </div>

                <label className="form-label" htmlFor="status">
                    Status:
                </label>
                <select
                    {...register('status')}
                    placeholder="Select Status"
                    className="form-select capitalize !mt-1.5"
                    name="status"
                    id="status"
                >
                    <option key="0" value="default">
                        Select Status
                    </option>
                    {specialtyStatus.map((status) => (
                        <option key={status.key} className="capitalize" value={status.key}>
                            {status.value}
                        </option>
                    ))}
                </select>

                <button disabled={formState.isSubmitting} type="submit" className="btn btn-primary ml-auto">
                    Submit
                </button>
            </form>
        </Sheet>
    );
};

export default forwardRef(AddSpeciality);
