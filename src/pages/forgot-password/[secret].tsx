import { useMutation, useQuery } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PEFooter from '../../components/footer/PEFooter';
import PEHeader from '../../components/header/PEHeader';
import { LoadingDialog } from '../../components/loadingDialog/LoadingDialog';
import PEButton from '../../components/standard/buttons/PEButton';
import PEPasswordTextField from '../../components/standard/textFields/PEPasswordTextField';
import Spacer from '../../components/utility/spacer/Spacer';
import VStack from '../../components/utility/vStack/VStack';
import {
    ConfirmOneOneTimeAccessTokenDocument,
    GetProfileQueryDocument,
    UpdateUserPasswordDocument,
} from '../../data-source/generated/graphql';

const Index: NextPage = () => {
    const router = useRouter();
    const secret = router.query.secret;

    const [state, setState] = useState<'LOADING' | 'FAILED' | 'SUCCESSFUL'>('LOADING');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [confirmOneTimeAccessToken] = useMutation(ConfirmOneOneTimeAccessTokenDocument, {
        variables: { secret: secret as string },
    });

    const [updateUserPassword] = useMutation(UpdateUserPasswordDocument);
    const { data: profileData, refetch } = useQuery(GetProfileQueryDocument);

    useEffect(() => {
        confirmOneTimeAccessToken()
            .then(({ data }) => {
                if (!data?.users.oneTimeAccessToken.success) {
                    setState('FAILED');
                    return;
                }
                setState('SUCCESSFUL');
                void refetch();
            })
            .catch(() => setState('FAILED'));
    }, [confirmOneTimeAccessToken, refetch]);

    const signedInUserId = profileData?.users.me?.userId;
    const disabled = !signedInUserId || password !== passwordRepeat || password === '';

    function onSavePassword(): void {
        if (!signedInUserId) return;
        setState('LOADING');
        updateUserPassword({ variables: { userId: signedInUserId, password } })
            .then(({ data }) => data?.users.success && router.push('/profile'))
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Head>
                <title>PeopleEat - forgot password</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full min-h-screen" gap={64}>
                <PEHeader />

                <LoadingDialog isLoading={state === 'LOADING'} />

                <Dialog open={state === 'FAILED'}>
                    <DialogTitle>Da ist etwas schief gelaufen</DialogTitle>
                    <DialogContent>Es ist ein unerwarteter Fehler aufgetreten</DialogContent>
                </Dialog>

                <Dialog open={state === 'SUCCESSFUL'}>
                    <DialogTitle>Neues Passwort festlegen</DialogTitle>
                    <DialogContent>
                        <VStack gap={32}>
                            <PEPasswordTextField
                                password={password}
                                placeholder="Neues Passwort"
                                onChange={(changedPassword): void => setPassword(changedPassword)}
                            />
                            <PEPasswordTextField
                                password={passwordRepeat}
                                placeholder="Neues Passwort wiederholen"
                                onChange={(changedPassword): void => setPasswordRepeat(changedPassword)}
                            />
                            <PEButton title="Neues Passwort speichern" onClick={onSavePassword} disabled={disabled} />
                        </VStack>
                    </DialogContent>
                </Dialog>

                <Spacer />

                <PEFooter />
            </VStack>
        </>
    );
};

export default Index;
