import { useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PEFooter from '../../components/footer/PEFooter';
import PEHeader from '../../components/header/PEHeader';
import PEButton from '../../components/standard/buttons/PEButton';
import Spacer from '../../components/utility/spacer/Spacer';
import VStack from '../../components/utility/vStack/VStack';
import { UpdateCookHasStripePayoutMethodActivatedDocument } from '../../data-source/generated/graphql';

const Index: NextPage = () => {
    const router = useRouter();
    const cookId = router.query.cookId;

    const [state, setState] = useState<'LOADING' | 'FAILED' | 'SUCCESSFUL'>('LOADING');

    const [updateHasStripePayoutMethodActivated] = useMutation(UpdateCookHasStripePayoutMethodActivatedDocument);

    useEffect(() => {
        if (!cookId || typeof cookId !== 'string') {
            setState('FAILED');
            return;
        }
        updateHasStripePayoutMethodActivated({ variables: { cookId } })
            .then(({ data }) => {
                if (!data?.cooks.success) {
                    setState('FAILED');
                    return;
                }
                setState('SUCCESSFUL');
            })
            .catch(() => setState('FAILED'));
    }, [updateHasStripePayoutMethodActivated, cookId]);

    return (
        <>
            <Head>
                <title>PeopleEat - Wallet Onboarding Successful</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full min-h-screen" gap={64}>
                <PEHeader />

                {state === 'SUCCESSFUL' && (
                    <VStack gap={64}>
                        <h1>Dein Wallet wurde erfolgreich angelegt!</h1>

                        <p>Ab sofort kannst du zukünftige Transaktionen über dein Wallet einsehen und verwalten.</p>

                        <Image src="/wallet-onboarding-successful.png" alt="" width={400} height={400} style={{ objectFit: 'cover' }} />

                        <Link href="/chef-profile" className="no-underline">
                            <PEButton title="Zum Koch Profil" onClick={(): void => undefined} />
                        </Link>
                    </VStack>
                )}

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

                <Spacer />

                <PEFooter />
            </VStack>
        </>
    );
};

export default Index;
