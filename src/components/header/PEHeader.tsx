import { type ReactElement } from 'react';
import useResponsive from '../../hooks/useResponsive';
import PEHeaderDesktop from './PEHeaderDesktop';
import PEHeaderMobile from './PEHeaderMobile';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeader({ className, signedInUser }: PEHeaderProps): ReactElement | null {
    const { isMobile } = useResponsive();

    return isMobile ? (
        <PEHeaderMobile className={className} signedInUser={signedInUser} />
    ) : (
        <PEHeaderDesktop className={className} signedInUser={signedInUser} />
    );
}
