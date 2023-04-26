import classNames from 'classnames';
import { useState, type ReactElement } from 'react';

export interface PEToggleProps {
    onClick: () => void;
    active?: boolean;
    title: string;
}

export default function PEToggle({ onClick, active, title }: PEToggleProps): ReactElement {
    const baseClassNames =
        'w-[70px] h-[70px] flex items-center border-solid gap-2 p-3 justify-center w-full rounded-15 border-0 transition-all';
    const [toggle, setToggle] = useState(active);

    function handleClick(): void {
        setToggle(!toggle);
        onClick();
    }

    return (
        <div
            onClick={handleClick}
            className={classNames(baseClassNames, {
                ['bg-orange']: toggle,
                ['bg-base']: !toggle,
            })}
        >
            <span
                className={classNames('text-text-s text-primary md:text-text-m', {
                    ['text-white']: toggle,
                    ['text-preBlack']: !toggle,
                })}
            >
                {title}
            </span>
        </div>
    );
}
