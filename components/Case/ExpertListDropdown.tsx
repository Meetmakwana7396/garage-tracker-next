import axios from '@/libs/axios';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Select, { StylesConfig } from 'react-select';

const ExpertListDropdown = ({ selectedOption, parentCallback }: any, forwardedRef: any) => {
    const [experts, setExperts] = useState<any>([]);
    const [options, setOptions] = useState<any>([]);
    const [option, setOption] = useState<any>(null);

    const getExperts = async () => {
        try {
            const { data } = await axios.get('/admin/experts/list');
            setExperts(data.dataset);
        } catch (error) {}
    };

    useImperativeHandle(forwardedRef, () => ({
        selectedValue() {
            return option;
        },
    }));

    const handleChange = (option: any) => {
        parentCallback(option.value);
    };

    const colorStyles: StylesConfig<any> = {
        placeholder: (base: any) => ({
            ...base,
            color: 'black', // Placeholder color
        }),
        control: (styles: any, { isFocused }: any) => ({
            ...styles,
            outline: 'none',
            boxShadow: 'none',
            border: isFocused ? '1px solid #4361ee' : '1px solid #e0e6ed',

            ':hover': {
                ...styles[':hover'],
                border: isFocused ? '1px solid #4361ee' : '1px solid #e0e6ed',
            },
        }),
        option: (styles: any) => ({
            ...styles,
            color: '',
            cursor: 'default',
            outline: 'none',
            singleValue: (styles: any) => ({
                ...styles,
                color: 'red', // Color for selected option
            }),
        }),
    };

    useEffect(() => {
        getExperts();
    }, []);

    useEffect(() => {
        if (experts) {
            const temp = experts.map((expert: any) => {
                return {
                    value: expert.id,
                    label: (
                        <div>
                            {expert.first_name} {expert.last_name}
                            <p className="text-[10px] text-black/70">{expert.email}</p>
                        </div>
                    ),
                };
            });
            setOptions(temp);

            experts.map((expert: any) => {
                if (expert.id === selectedOption) {
                    setOption({
                        value: expert.id,
                        label: (
                            <div>
                                {expert.first_name} {expert.last_name}
                                <p className="text-[10px] text-black/70">{expert.email}</p>
                            </div>
                        ),
                    });
                }
            });
        }
    }, [experts, selectedOption]);

    return (
        <Select
            placeholder="Select an option"
            value={option}
            onChange={handleChange}
            styles={colorStyles}
            options={options}
        />
    );
};

export default forwardRef(ExpertListDropdown);
