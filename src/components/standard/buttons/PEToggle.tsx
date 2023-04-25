import { type ReactElement } from 'react';
import PEButton from './PEButton';

export interface PEToggleProps {
    onClick: () => void;
    active?: boolean;
    title: string;
}

export default function PEToggle({ onClick, active, title }: PEToggleProps): ReactElement {
    const baseClassNames =
        'max-w-[70px] h-[70px] flex items-center border-solid gap-2 p-3 justify-center w-full rounded-15 border-0 transition-all';
    return <PEButton onClick={onClick} className={baseClassNames} type={active ? 'primary' : 'base'} size={'l'} title={title} />;
}
