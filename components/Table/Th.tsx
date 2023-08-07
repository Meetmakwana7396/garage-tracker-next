import clsx from 'clsx';
import React from 'react';
import IconChevronDown from '../Icon/IconChevronDown';

const Th = ({ children, isActive, isAscending, noSorting, onClick }: any) => {
    return (
        <th className={clsx(!!isActive && 'text-primary')}>
            <div
                className={clsx('inline-flex group items-center', !noSorting && 'hover:text-primary cursor-pointer')}
                onClick={onClick}
            >
                {children}
                {!noSorting && (
                    <IconChevronDown
                        className={clsx(
                            'w-4 h-4 ml-1 group-hover:!text-primary shrink-0',
                            !!isActive ? '!text-primary' : '!text-black',
                            !!isAscending && !!isActive && 'rotate-180'
                        )}
                    />
                )}
            </div>
        </th>
    );
};

export default Th;
