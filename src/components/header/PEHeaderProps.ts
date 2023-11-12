import { type SignedInUser } from '../../shared-domain/SignedInUser';

export interface PEHeaderProps {
    className?: string;
    hidden?: boolean;
    signedInUser?: SignedInUser;
}
