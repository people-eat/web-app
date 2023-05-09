import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';

export interface PEButtonProps {
    type?: 'primary' | 'secondary' | 'base';
    size?: 'm' | 'l' | 's';
    disabled?: boolean;
    iconLeft?: Icon;
    iconRight?: Icon;
    iconSize?: number;
    className?: string;
    fontSize?: string;
    onClick: () => void;
    title: string;
    loading?: boolean;
}

export default function PEButton({
    type = 'primary',
    size = 'm',
    fontSize,
    disabled = false,
    iconLeft,
    iconRight,
    iconSize,
    className,
    onClick,
    title,
    loading,
}: PEButtonProps): ReactElement {
    const baseClassNames = 'flex items-center border-solid gap-2 p-3 box-border justify-center w-full rounded-15 border-0 transition-all';
    const color = classNames({
        'bg-orange text-white active:shadow-active cursor-pointer': type === 'primary' && !disabled,
        'border-[1px] bg-white border-orange active:shadow-active text-orange cursor-pointer': type === 'secondary' && !disabled,
        'bg-base text-preBlack active:shadow-active cursor-pointer': type === 'base' && !disabled,
    });

    const opacity = classNames({
        'bg-disabled text-white': disabled && type === 'primary',
        'border-[1px] border-disabled text-disabled': disabled && type === 'secondary',
    });

    const hover = classNames({
        'hover:bg-orangePlus': type === 'primary' && !disabled,
        'hover:shadow-primary': type === 'secondary' && !disabled,
    });

    const height = classNames({
        'h-[72px]': size === 'l',
        'h-[49px]': size === 'm' || size === 's',
    });

    const IconLeft = !!iconLeft && <PEIcon icon={iconLeft} edgeLength={iconSize ?? 24} />;
    const IconRight = !!iconRight && <PEIcon icon={iconRight} edgeLength={iconSize ?? 24} />;
    const Loader =
        type === 'primary' ? (
            <PEIcon className={'animate-spin'} icon={Icon.loaderWhite} />
        ) : (
            <PEIcon className={'animate-spin'} icon={Icon.loaderOrange} />
        );

    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={classNames(baseClassNames, fontSize, color, height, opacity, className, {
                [hover]: !disabled,
                ['max-w-[49px]']: !title && size === 'm',
                ['max-w-[72px]']: !title && size === 'l',
            })}
        >
            {loading ? (
                Loader
            ) : (
                <>
                    {IconLeft}
                    {title && (
                        <span
                            className={classNames('text-text-s text-primary md:text-text-m', {
                                'text-text-s': size === 's',
                            })}
                        >
                            {title}
                        </span>
                    )}
                    {IconRight}
                </>
            )}
        </button>
    );
}
