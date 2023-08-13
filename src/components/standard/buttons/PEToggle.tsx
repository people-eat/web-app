import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEButton from './PEButton';

export interface PEToggleProps {
    onClick: () => void;
    active?: boolean;
    title: string;
}

export default function PEToggle({ onClick, active, title }: PEToggleProps): ReactElement {
    const { isMobile } = useResponsive();
    const baseClassNames = 'flex items-center border-solid gap-2 justify-center w-full rounded-15 border-0 transition-all';

    let paddingClasses = 'p-3';

    if (isMobile) paddingClasses = 'px-8 py-1';

    const combinedClassNames = `${baseClassNames} ${paddingClasses}`;

    return (
        <PEButton
            onClick={onClick}
            className={combinedClassNames}
            type={active ? 'primary' : 'base'}
            size={isMobile ? 'm' : 'l'}
            title={title}
        />
    );
}
