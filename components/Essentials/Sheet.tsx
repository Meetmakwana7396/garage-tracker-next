import { forwardRef, ReactNode, Ref, useImperativeHandle, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface SheetProps {
    children: ReactNode;
    width?: string;
    button?: ReactNode;
}

export type SheetHandle = {
    open: () => void;
    close: () => void;
};

const Sheet = forwardRef(({ children, width, button }: SheetProps, ref: Ref<SheetHandle>) => {
    const [open, setOpen] = useState(false);

    const openSheet = () => {
        setOpen(true);
    };

    const closeSheet = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        open() {
            openSheet();
        },
        close() {
            closeSheet();
        },
    }));

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            {button && <Dialog.Trigger asChild>{button}</Dialog.Trigger>}
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 z-[60] transition-all duration-300 data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out">
                    <Dialog.Content
                        onOpenAutoFocus={(e) => {
                            e.preventDefault();
                        }}
                        className="w-full h-screen absolute overflow-y-auto ease-in-out right-0 transition-transform bg-white shadow-lg p-6 pb-0 outline-none animate-in slide-in-from-right duration-200 dark:bg-black dark:text-white-dark"
                        style={{ maxWidth: width || '432px' }}
                    >
                        <div>{children}</div>
                        <Dialog.Close asChild>
                            <button
                                className="outline-none btn absolute top-4 right-4 bg-gray-300 p-2 rounded-full dark:bg-black-light dark:border-none"
                                aria-label="Close"
                            >
                                {/* <IconClose className="text-black w-5 h-5" /> */}
                                <span className="text-sm">Esc</span>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
});

Sheet.displayName = 'Sheet';
export default Sheet;
