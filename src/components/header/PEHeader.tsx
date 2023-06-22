import { type ReactElement } from 'react';
import useResponsive from '../../hooks/useResponsive';
import PEHeaderDesktop from './PEHeaderDesktop';
import PEHeaderMobile from './PEHeaderMobile';
import { type PEHeaderProps } from './PEHeaderProps';

export default function PEHeader({ signedInUser, mobileMenuTabs, isMobileMenuOpen, setOpenMobileMenu }: PEHeaderProps): ReactElement {
    const { isMobile } = useResponsive();

    return isMobile ? (
        <PEHeaderMobile mobileMenuTabs={mobileMenuTabs} isMobileMenuOpen={isMobileMenuOpen} setOpenMobileMenu={setOpenMobileMenu} />
    ) : (
        <PEHeaderDesktop signedInUser={signedInUser} />
    );
}
