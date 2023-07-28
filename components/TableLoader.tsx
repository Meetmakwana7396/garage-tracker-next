import { FC } from 'react';
import IconLoaderDots from './Icon/IconLoaderDots';

interface LoadingProps {
    message?: string;
    colspan: number;
}

const TableLoader: FC<LoadingProps> = ({ message, colspan }) => {
    return (
        <tr className="pointer-events-none">
            <td colSpan={colspan} className="p-8 ">
                <div className="mx-auto w-fit">
                    <IconLoaderDots className="w-16 text-black" />
                    {message && <div className="mt-3 text-sm">{message}</div>}
                </div>
            </td>
        </tr>
    );
};

export default TableLoader;
