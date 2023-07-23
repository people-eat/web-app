import { useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
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
import { ConfirmOneEmailAddressUpdateDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';

const Index: NextPage = () => {
    const { isMobile } = useResponsive();
    const router = useRouter();
    const secret = router.query.secret;
    const { t } = useTranslation('common');
    const [confirmOneEmailAddressUpdate, { data, loading, error }] = useMutation(ConfirmOneEmailAddressUpdateDocument, {
        variables: { userId: '', secret: secret as string },
    });

    return (
        <>
            <Head>
                <title>PeopleEat - email confirmation</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <VStack className="w-full min-h-screen" gap={64}>
                {isMobile ? <PEHeaderMobile /> : <PEHeaderDesktop />}

                <Dialog open>
                    <DialogTitle>{t('email-confirmation')}</DialogTitle>
                    <DialogContent>
                        {data?.users.emailAddressUpdate.success && (
                            <VStack>
                                <p>{t('email-confirmation-success')}</p>
                                <Link href={'/profile'} className="no-underline">
                                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>{t('back')}</Button>
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
                                <span style={{ maxWidth: 256, textAlign: 'center' }}>{t('email-confirmation-button')}</span>
                                <PEButton title="Confirm" onClick={(): void => void confirmOneEmailAddressUpdate()} />
                            </VStack>
                        )}

                        {(error || (data && !data.users.emailAddressUpdate.success)) && t('error')}

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
