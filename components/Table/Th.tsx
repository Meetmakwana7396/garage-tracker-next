import clsx from 'clsx';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

const Th = ({ children, isActive, isAscending, noSorting, onClick }: any) => {
    return (
        <th className={clsx(!!isActive && 'text-primary')}>
            <div
                className={clsx('inline-flex group', !noSorting && 'hover:text-primary cursor-pointer')}
                onClick={onClick}
            >
                {children}
                {!noSorting && (
                    <BiChevronDown
                        className={clsx(
                            'action-icon ml-1 group-hover:text-primary shrink-0',
                            !!isActive && '!text-primary',
                            !!isAscending && !!isActive && 'rotate-180'
                        )}
                    />
                )}
            </div>
        </th>
    );
};

export default Th;
