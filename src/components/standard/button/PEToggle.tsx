import classNames from 'classnames';
import { type ReactElement } from 'react';

export interface PEToggleProps {
    onClick: () => void;
    active?: boolean;
    title: string;
}

export default function PEToggle({ onClick, active, title }: PEToggleProps): ReactElement {
    const baseClassNames =
        'w-[70px] h-[70px] flex items-center border-solid gap-2 p-3 justify-center w-full rounded-15 border-0 transition-all';

    function handleClick(): void {
        onClick();
    }

    return (
        <div
            onClick={handleClick}
            className={classNames(baseClassNames, {
                ['bg-orange']: active,
                ['bg-base']: !active,
            })}
        >
            <span
                className={classNames('text-text-s text-primary md:text-text-m', {
                    ['text-white']: active,
                    ['text-preBlack']: !active,
                })}
            >
                {title}
            </span>
        </div>
    );
}
