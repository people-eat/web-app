import { useMutation } from '@apollo/client';
import { Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeaderDesktop from '../../../components/header/PEHeaderDesktop';
import PEHeaderMobile from '../../../components/header/PEHeaderMobile';
import PEButton from '../../../components/standard/buttons/PEButton';
import VStack from '../../../components/utility/vStack/VStack';
import { ConfirmOneEmailAddressUpdateDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';

const Index: NextPage = () => {
    const { isMobile } = useResponsive();
    const router = useRouter();
    const secret = router.query.secret;

    const [confirmOneEmailAddressUpdate, { data, loading, error }] = useMutation(ConfirmOneEmailAddressUpdateDocument, {
        variables: { userId: '', secret: secret as string },
    });

    return (
        <>
            <Head>
                <title>PeopleEat - email confirmation</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack>
                {isMobile ? <PEHeaderMobile /> : <PEHeaderDesktop />}

                <div style={{ margin: '64px' }}>
                    {!data && <PEButton title="Confirm Email Address" onClick={(): any => confirmOneEmailAddressUpdate()} />}

                    {data?.users.emailAddressUpdate.success && (
                        <VStack>
                            <p>You successfully verified your email address</p>
                            <Link href={'/profile'} className="no-underline">
                                <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>To my profile page</Button>
                            </Link>
                        </VStack>
                    )}
                </div>

                <PEFooter />

                {loading && (
                    <Dialog open>
                        <DialogContent>
                            <CircularProgress />
                        </DialogContent>
                    </Dialog>
                )}

                {(error || (data && !data.users.emailAddressUpdate.success)) && (
                    <Dialog open>
                        <DialogContent>An error ocurred</DialogContent>
                    </Dialog>
                )}
            </VStack>
        </>
    );
};

export default Index;
