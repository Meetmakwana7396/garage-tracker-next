import clsx from 'clsx';
import React from 'react';
import IconChevronDown from '../Icon/IconChevronDown';

const Th = ({ children, isActive, isAscending, noSorting, onClick }: any) => {
    return (
        <th
            className={clsx(
                !!isActive && 'text-primary dark:text-primary',
                !noSorting && 'hover:text-primary cursor-pointer'
            )}
        >
            <div className={clsx('inline-flex group items-center')} onClick={onClick}>
                {children}
                {!noSorting && (
                    <IconChevronDown
                        className={clsx(
                            'w-4 h-4 ml-1 group-hover:!text-primary shrink-0',
                            !!isAscending && !!isActive && 'rotate-180'
                        )}
                    />
                )}
            </div>
        </th>
    );
};

export default Th;
