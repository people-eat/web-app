import classNames from 'classnames';
import { type ReactElement } from 'react';

export interface PELineButtonProps {
    onClick?: () => void;
    active?: boolean;
    title: string;
    fontSize?: string;
}

export default function PELineButton({ onClick, title, fontSize = 'text-text-s' }: PELineButtonProps): ReactElement {
    const baseClassNames = 'flex flex-col cursor-pointer items-center border-solid gap-2 justify-center border-0';

    return (
        <div onClick={onClick} className={classNames(baseClassNames, fontSize)}>
            <span className={classNames('bg-transparent text-orange')}>{title}</span>
            <span className="w-full h-[1px] -mt-2 bg-orange"></span>
        </div>
    );
}
