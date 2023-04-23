import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { type ReactElement } from 'react';

export default function SignUpPageSuccessDialog(): ReactElement {
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
                <Link href="sign-in">
                    <Button autoFocus>To Sign In</Button>
                </Link>
            </DialogActions>
        </>
    );
}
