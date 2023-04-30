import classNames from 'classnames';
import { type MouseEvent, type ReactElement } from 'react';

export interface PELineButtonProps {
    onClick: () => void;
    active?: boolean;
    title: string;
}

export default function PELineButton({ onClick, title }: PELineButtonProps): ReactElement {
    const baseClassNames = 'flex flex-col hover:translate-y-[-2px] items-center border-solid gap-2 justify-center border-0';

    function handleClick(event: MouseEvent<HTMLDivElement>): void {
        event.preventDefault();
        onClick?.();
    }

    return (
        <div onClick={handleClick} className={classNames(baseClassNames)}>
            <span className={classNames('text-text-s bg-transparent text-orange')}>{title}</span>
            <span className="w-full h-[1px] -mt-2 bg-orange "></span>
        </div>
    );
}
