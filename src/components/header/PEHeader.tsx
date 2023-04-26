import { type ReactElement } from 'react';
import useResponsive from '../../hooks/useResponsive';
import PEHeaderDesktop from './PEHeaderDesktop';
import PEHeaderMobile from './PEHeaderMobile';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeader({ signedInUser }: PEHeaderProps): ReactElement {
    const { isMobile } = useResponsive();

    return isMobile ? <PEHeaderMobile /> : <PEHeaderDesktop signedInUser={signedInUser} />;
}
