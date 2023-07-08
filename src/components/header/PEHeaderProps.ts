import { type SignedInUser } from '../../shared-domain/SignedInUser';

export interface PEHeaderProps {
    signedInUser?: SignedInUser;
    mobileMenuTabs?: { title: string; link: string }[];
    isMobileMenuOpen?: boolean;
    setOpenMobileMenu?: (value: boolean) => void;
    menuButtonLink?: string;
    menuButtonText?: string;
}
