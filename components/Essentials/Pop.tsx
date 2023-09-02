import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

const Pop = ({ width, button, children }: any) => (
    <Popover.Root>
        <Popover.Trigger asChild>
            <div className="cursor-pointer">{button && button}</div>
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content
                className={clsx(
                    'rounded dark:bg-black-light dark:border-black-more-light shadow-3xl z-[999] border shadow bg-white will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade overflow-hidden',
                    width ? width : 'w-fit'
                )}
                sideOffset={5}
                alignOffset={10}
                avoidCollisions
                collisionPadding={10}
                align="start"
            >
                <ul className="!p-2 font-semibold text-sm text-dark dark:text-white-dark dark:text-white-light/90">
                    {children}
                </ul>
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

export default Pop;
