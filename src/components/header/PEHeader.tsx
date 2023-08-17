import { type ReactElement } from 'react';
import useResponsive from '../../hooks/useResponsive';
import PEHeaderDesktop from './PEHeaderDesktop';
import PEHeaderMobile from './PEHeaderMobile';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeader({ signedInUser, ...mobileParams }: PEHeaderProps): ReactElement {
    const { isMobile } = useResponsive();

    return isMobile ? <PEHeaderMobile {...mobileParams} signedInUser={signedInUser} /> : <PEHeaderDesktop signedInUser={signedInUser} />;
}
