// your-select.jsx
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { forwardRef } from 'react';

export const Select = forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Root {...props}>
            <SelectPrimitive.Trigger ref={forwardedRef}>
                <SelectPrimitive.Value />
                <SelectPrimitive.Icon>
                    <ChevronDownIcon />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
                <SelectPrimitive.Content>
                    <SelectPrimitive.ScrollUpButton>
                        <ChevronUpIcon />
                    </SelectPrimitive.ScrollUpButton>
                    <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
                    <SelectPrimitive.ScrollDownButton>
                        <ChevronDownIcon />
                    </SelectPrimitive.ScrollDownButton>
                </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
    );
});
Select.displayName = 'Select';

export const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Item {...props} ref={forwardedRef}>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            <SelectPrimitive.ItemIndicator>
                <CheckIcon />
            </SelectPrimitive.ItemIndicator>
        </SelectPrimitive.Item>
    );
});
SelectItem.displayName = 'SelectItem';
