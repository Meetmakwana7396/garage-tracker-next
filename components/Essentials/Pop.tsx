import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import IconClose from '../Icon/IconClose';
import clsx from 'clsx';

const Pop = ({ width, button, children }: any) => (
    <Popover.Root>
        <Popover.Trigger asChild>
            <div className="cursor-pointer">{button && button}</div>
        </Popover.Trigger>
        <Popover.Portal>
            <Popover.Content
                className={clsx(
                    'rounded shadow bg-white border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade',
                    width ? width : 'w-fit'
                )}
                sideOffset={5}
                alignOffset={10}
                avoidCollisions
                collisionPadding={10}
            >
                {children}
                <Popover.Close
                    className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 outline-none cursor-default"
                    aria-label="Close"
                >
                    {/* <IconClose /> */}
                </Popover.Close>
                <Popover.Arrow className="fill-gray-300 w-3 h-2" />
            </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

export default Pop;
