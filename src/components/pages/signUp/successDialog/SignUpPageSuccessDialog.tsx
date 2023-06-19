import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { type ReactElement } from 'react';

function retrieveEmailProviderFromEmailAddress(emailAddress?: string): 'GOOGLE' | undefined {
    if (!emailAddress) return;
    const domainAndTdl: string | undefined = emailAddress.split('@')[1];
    if (!domainAndTdl) return;
    const domain: string | undefined = domainAndTdl.split('.')[0];
    if (!domain) return;
    if (domain === 'gmail') return 'GOOGLE';
}

export interface SignUpPageSuccessDialogProps {
    emailAddress?: string;
}

export default function SignUpPageSuccessDialog({ emailAddress }: SignUpPageSuccessDialogProps): ReactElement {
    const emailProvider = retrieveEmailProviderFromEmailAddress(emailAddress);

    return (
        <>
            <DialogTitle>Your registration has been successful</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please check your email inbox to verify our email address. Afterwards you will be able to sign into your new PeopleEat
                    account
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link className="no-underline" href="sign-in">
                    <Button autoFocus>To Sign In</Button>
                </Link>
                {emailProvider === 'GOOGLE' && (
                    <Link className="no-underline" href="https://mail.google.com">
                        <Button autoFocus>To Gmail</Button>
                    </Link>
                )}
            </DialogActions>
        </>
    );
}
