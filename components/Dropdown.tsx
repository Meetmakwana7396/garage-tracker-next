import React, { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Modifier, usePopper } from 'react-popper';

interface DropdownProps {
    offset: Array<number>;
    placement: any;
    btnClassName: string;
    button: React.ReactNode;
    children: React.ReactNode;
}

const Dropdown = (props: DropdownProps, forwardedRef: any) => {
    const [visibility, setVisibility] = useState(false);
    const referenceRef = useRef<any>();
    const popperRef = useRef<any>();

    const { styles, attributes } = usePopper(referenceRef.current, popperRef.current, {
        placement: props?.placement || 'bottom-end',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: props.offset || [0],
                },
            },
        ] as Modifier<unknown>[],
    });

    const handleDocumentClick = (event: any) => {
        if (referenceRef.current.contains(event.target) || popperRef.current.contains(event.target)) {
            return;
        }

        setVisibility(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    useImperativeHandle(forwardedRef, () => ({
        close() {
            setVisibility(false);
        },
    }));

    return (
        <>
            <button
                ref={referenceRef}
                type="button"
                className={props.btnClassName}
                onClick={() => setVisibility(!visibility)}
            >
                {props.button}
            </button>

            <div
                ref={popperRef}
                style={styles.popper}
                {...attributes.popper}
                className="z-50"
                // onClick={() => setVisibility(!visibility)}
            >
                {visibility && props.children}
            </div>
        </>
    );
};

export default forwardRef(Dropdown);
