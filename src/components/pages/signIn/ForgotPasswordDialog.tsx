import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { CreateOneOneTimeAccessTokenByEmailAddressDocument } from '../../../data-source/generated/graphql';
import PEButton from '../../standard/buttons/PEButton';
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import VStack from '../../utility/vStack/VStack';

export interface ForgotPasswordDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function ForgotPasswordDialog({ open, onClose }: ForgotPasswordDialogProps): ReactElement {
    const [emailAddress, setEmailAddress] = useState({ value: '', isValid: false });
    const [state, setState] = useState<'NOT_STARTED' | 'LOADING' | 'FAILED' | 'SUCCESSFUL'>('NOT_STARTED');

    const [createOneTimeAccessToken] = useMutation(CreateOneOneTimeAccessTokenByEmailAddressDocument);

    function onForgotPassword(): void {
        setState('LOADING');
        createOneTimeAccessToken({ variables: { emailAddress: emailAddress.value } })
            .then(({ data }) => {
                if (!data?.users.oneTimeAccessToken.success) {
                    setState('FAILED');
                    return;
                }
                setState('SUCCESSFUL');
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                {state === 'NOT_STARTED' && (
                    <>
                        <DialogTitle>Passwort vergessen</DialogTitle>
                        <DialogContent>
                            <VStack gap={32}>
                                <PEEmailTextField
                                    email={emailAddress.value}
                                    onChange={(changedEmailAddress, isValid): void =>
                                        setEmailAddress({ value: changedEmailAddress, isValid })
                                    }
                                    placeholder="Email Adresse"
                                />

                                <PEButton
                                    title="Email zum Zurücksetzen abschicken"
                                    onClick={onForgotPassword}
                                    disabled={!emailAddress.isValid}
                                />
                            </VStack>
                        </DialogContent>
                    </>
                )}

                {state === 'LOADING' && (
                    <>
                        <DialogContent>
                            <VStack>
                                <CircularProgress />
                            </VStack>
                        </DialogContent>
                    </>
                )}

                {state === 'SUCCESSFUL' && (
                    <>
                        <DialogTitle>Email verschickt!</DialogTitle>
                        <DialogContent>
                            <VStack gap={32}>
                                Wir haben dir eine Email mit einem Link zum zurücksetzen Deines Passworts zugeschickt. Überprüfe dein
                                Postfach und komme anschließend zurück.
                                <PEButton title="Schließen" onClick={onClose} />
                            </VStack>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </>
    );
}
