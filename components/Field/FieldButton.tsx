import clsx from 'clsx';
import IconLoaderDots from '@/components/Icon/IconLoaderDots';

interface IFieldButton {
    children: string;
    onClick?: () => void;
    className?: string;
    type: 'submit' | 'button' | 'reset' | undefined;
    loading?: boolean;
    disabled?: boolean;
}

const FieldButton = ({ children, onClick, className, type, loading, disabled }: IFieldButton) => {
    return (
        <button
            type={type}
            disabled={loading || disabled || false}
            className={`${className} btn relative`}
            onClick={onClick}
        >
            <span className={clsx({ invisible: loading })}>{children}</span>
            <span className={clsx({ hidden: !loading }, 'absolute inset-0 flex items-center justify-center')}>
                <IconLoaderDots className="w-10" />
            </span>
        </button>
    );
};

export default FieldButton;
