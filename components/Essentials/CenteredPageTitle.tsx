import React from 'react';
import IconArrowLeft from '../Icon/IconArrowLeft';
import { useRouter } from 'next/router';

const CenteredPageTitle = ({ title }: any) => {
    const router = useRouter();
    return (
        <div className="page-heading-bar relative">
            <button onClick={() => router.back()} className="btn-ghost absolute -left-16 rounded-full p-2">
                <IconArrowLeft />
            </button>
            <h2 className="page-heading">{title}</h2>
        </div>
    );
};

export default CenteredPageTitle;
