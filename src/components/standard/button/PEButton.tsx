import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEButtonProps {
    type?: 'primary' | 'secondary';
    size?: 'm' | 'l' | 's';
    disabled?: boolean;
    iconLeft?: Icon;
    iconRight?: Icon;
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
    className,
    onClick,
    title,
    loading,
}: PEButtonProps): ReactElement {
    const baseClassNames = 'flex items-center border-solid gap-2 p-3 justify-center w-full rounded-15 border-0 transition-all';
    const color = classNames({
        'bg-orange text-white active:shadow-primary cursor-pointer': type === 'primary' && !disabled,
        'border-[1px] bg-white border-orange active:shadow-primary text-orange cursor-pointer': type === 'secondary' && !disabled,
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

    const IconLeft = !!iconLeft && <PeopleEatIcon icon={iconLeft} />;
    const IconRight = !!iconRight && <PeopleEatIcon icon={iconRight} />;
    const Loader =
        type === 'primary' ? (
            <PeopleEatIcon className={'animate-spin'} icon={Icon.loaderWhite} />
        ) : (
            <PeopleEatIcon className={'animate-spin'} icon={Icon.loaderOrange} />
        );

    return (
        <div
            onClick={onClick}
            className={classNames(baseClassNames, className, fontSize, color, height, opacity, {
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
        </div>
    );
}
