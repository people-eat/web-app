import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import PEHeaderMobile from '../../../components/header/PEHeaderMobile';
import VStack from '../../../components/utility/vStack/VStack';
import { ConfirmOneEmailAddressUpdateDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';

const Index: NextPage = () => {
    const { isMobile } = useResponsive();
    const router = useRouter();
    const secret = router.query.secret;

    if (typeof secret !== 'string') return <>An error occurred</>;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, react-hooks/rules-of-hooks, @typescript-eslint/no-unsafe-assignment
    const [confirmOneEmailAddressUpdate, { data, loading, error }] = useMutation(ConfirmOneEmailAddressUpdateDocument, {
        variables: { userId: '', secret },
    });

    if (!data && !error && !loading) {
        confirmOneEmailAddressUpdate()
            .then()
            .catch((err) => console.log(err));
    }

    if (error) return <>An error occurred</>;

    if (loading) return <CircularProgress />;

    return (
        <>
            <Head>
                <title>PeopleEat - email confirmation</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack>
                {isMobile ? <PEHeaderMobile /> : <PEHeader />}

                <div style={{ margin: '64px' }}>
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        data?.users?.emailAddressUpdate?.success && (
                            <VStack>
                                <p>You successfully verified your email address</p>
                                <Link href={'/profile'} className="no-underline">
                                    <Button style={{ color: 'rgba(31, 31, 31, 0.8)' }}>To my profile page</Button>
                                </Link>
                            </VStack>
                        )
                    }
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        !data?.users?.emailAddressUpdate?.success && <>It looks like your confirmation link has expired</>
                    }
                </div>

                <PEFooter />
            </VStack>
        </>
    );
};

export default Index;
