import { type SignedInUser } from '../../shared/SignedInUser';

export interface PEHeaderProps {
    signedInUser?: SignedInUser;
    mobileMenuTabs?: { title: string; link: string }[];
}
