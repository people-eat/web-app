import { useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeaderDesktop from '../../../components/header/PEHeaderDesktop';
import PEHeaderMobile from '../../../components/header/PEHeaderMobile';
import PEButton from '../../../components/standard/buttons/PEButton';
import Spacer from '../../../components/utility/spacer/Spacer';
import VStack from '../../../components/utility/vStack/VStack';
import { ConfirmOnePhoneNumberUpdateDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';

const Index: NextPage = () => {
    const { isMobile } = useResponsive();
    const router = useRouter();
    const secret = router.query.secret;

    const [confirmOnePhoneNumberUpdate, { data, loading, error }] = useMutation(ConfirmOnePhoneNumberUpdateDocument, {
        variables: { userId: '', secret: secret as string },
    });

    return (
        <>
            <Head>
                <title>PeopleEat - phone number confirmation</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full min-h-screen" gap={64}>
                {isMobile ? <PEHeaderMobile /> : <PEHeaderDesktop />}

                <Dialog open>
                    <DialogTitle>Confirm Email Address</DialogTitle>
                    <DialogContent>
                        {data?.users.phoneNumberUpdate.success && (
                            <VStack>
                                <p>You successfully verified your phone number</p>
                                <Link href={'/profile'} className="no-underline">
                                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>To my profile page</Button>
                                </Link>
                            </VStack>
                        )}

                        {!data && (
                            <VStack gap={32}>
                                <Image
                                    src="/email-confirmation.png"
                                    alt=""
                                    width={200}
                                    height={100}
                                    style={{ objectPosition: 'center', objectFit: 'scale-down' }}
                                />
                                <span style={{ maxWidth: 256, textAlign: 'center' }}>
                                    To confirm your Email Address please click the button below
                                </span>
                                <PEButton title="Confirm" onClick={(): void => void confirmOnePhoneNumberUpdate()} />
                            </VStack>
                        )}

                        {(error || (data && !data.users.phoneNumberUpdate.success)) && 'An error ocurred'}

                        {loading && <CircularProgress />}
                    </DialogContent>
                </Dialog>

                <Spacer />

                <PEFooter />
            </VStack>
        </>
    );
};

export default Index;
