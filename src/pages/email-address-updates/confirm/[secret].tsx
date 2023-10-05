import { useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import PEButton from '../../../components/standard/buttons/PEButton';
import Spacer from '../../../components/utility/spacer/Spacer';
import VStack from '../../../components/utility/vStack/VStack';
import { ConfirmOneEmailAddressUpdateDocument } from '../../../data-source/generated/graphql';

const Index: NextPage = () => {
    const router = useRouter();
    const secret = router.query.secret;

    const [state, setState] = useState<'LOADING' | 'FAILED' | 'SUCCESSFUL'>('LOADING');

    const [confirmOneEmailAddressUpdate] = useMutation(ConfirmOneEmailAddressUpdateDocument, {
        variables: { secret: secret as string },
    });

    useEffect(() => {
        confirmOneEmailAddressUpdate()
            .then(({ data }) => {
                if (!data?.users.emailAddressUpdate.success) {
                    setState('FAILED');
                    return;
                }
                setState('SUCCESSFUL');
            })
            .catch(() => setState('FAILED'));
    }, [confirmOneEmailAddressUpdate]);

    return (
        <>
            <Head>
                <title>PeopleEat - Email Confirmation</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full min-h-screen" gap={64}>
                <PEHeader />

                <Dialog open={state === 'LOADING'}>
                    <DialogContent>
                        <VStack>
                            <CircularProgress />
                        </VStack>
                    </DialogContent>
                </Dialog>

                <Dialog open={state === 'FAILED'}>
                    <DialogTitle>Da ist etwas schief gelaufen</DialogTitle>
                    <DialogContent>Es ist ein unerwarteter Fehler aufgetreten</DialogContent>
                </Dialog>

                <Dialog open={state === 'SUCCESSFUL'}>
                    <DialogTitle>Deine Email Adresse wurde erfolgreich bestätigt</DialogTitle>
                    <DialogContent>
                        <VStack gap={32}>
                            <Image
                                src="/email-confirmation.png"
                                alt=""
                                width={200}
                                height={100}
                                style={{ objectPosition: 'center', objectFit: 'scale-down' }}
                            />
                            <PEButton title="Zum Benutzerprofil" onClick={(): void => void router.push('/profile')} />
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
