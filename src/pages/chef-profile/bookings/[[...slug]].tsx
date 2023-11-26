import { Divider, List } from '@mui/material';
import classNames from 'classnames';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BookingListHeader, type BookingListHeaderFilterOption } from '../../../components/bookingListHeader/BookingListHeader';
import { BookingRequestCard } from '../../../components/cards/bookingRequestCard/BookingRequestCard';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import { CookProfileNavigationTabs } from '../../../components/navigation/CookProfileNavigationTabs';
import BookingRequestDetail from '../../../components/pages/cookProfile/CookBookingRequestDetail';
import styles from '../../../components/pages/cookProfile/cook-bookings.module.css';
import VStack from '../../../components/utility/vStack/VStack';
import { createApolloClient } from '../../../data-source/createApolloClient';
import {
    GetCookProfileBookingsPageDataDocument,
    GetSignedInUserDocument,
    type GetCookProfileBookingsPageDataQuery,
    type GetSignedInUserQuery,
} from '../../../data-source/generated/graphql';

interface ServerSideProps {
    signedInUser: NonNullable<GetSignedInUserQuery['users']['signedInUser']>;
    bookingRequests: NonNullable<GetCookProfileBookingsPageDataQuery['cooks']['bookingRequests']['findMany']>;
    hasStripePayoutMethodActivated: boolean;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) throw new Error();

    const { data: bookingRequestData } = await apolloClient.query({
        query: GetCookProfileBookingsPageDataDocument,
        variables: { cookId: signedInUser.userId },
    });

    return {
        props: {
            signedInUser,
            bookingRequests: bookingRequestData.cooks.bookingRequests.findMany ?? [],
            hasStripePayoutMethodActivated: bookingRequestData.cooks.findOne?.hasStripePayoutMethodActivated ?? false,
        },
    };
};

const Index: NextPage<ServerSideProps> = ({ signedInUser, bookingRequests, hasStripePayoutMethodActivated }) => {
    const router = useRouter();

    const [selectedBookingRequestId] = router.query.slug ?? [];

    const [filterOption, setFilterOption] = useState<BookingListHeaderFilterOption>('ALL');

    const filteredBookingRequests = bookingRequests.filter((bookingRequest) => {
        switch (filterOption) {
            case 'ALL':
                return true;
            case 'OPEN':
                return bookingRequest.status === 'OPEN';
            case 'IN_PROGRESS':
                return bookingRequest.status === 'PENDING';
            case 'DONE':
                return bookingRequest.status === 'COMPLETED';
            case 'CANCELED':
                return bookingRequest.status === 'CANCELED';
        }
    });

    return (
        <>
            <Head>
                <title>PeopleEat - Profile - Bookings</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full" gap={32}>
                <PEHeader className={Boolean(selectedBookingRequestId) ? styles.hiddenOnMobile : ''} signedInUser={signedInUser} />

                <div className={styles.bodyContainer}>
                    <CookProfileNavigationTabs
                        selection="BOOKINGS"
                        className={Boolean(selectedBookingRequestId) ? styles.hiddenOnMobile : ''}
                    />

                    <main className={styles.mainContainer}>
                        <div
                            className={classNames(
                                styles.bookingListContainer,
                                Boolean(selectedBookingRequestId) ? styles.hiddenOnMobile : '',
                            )}
                        >
                            <BookingListHeader selectedFilterOption={filterOption} onSelectedFilterOptionChange={setFilterOption} />

                            <Divider />

                            <List className={styles.bookingList}>
                                {filteredBookingRequests.map((bookingRequest, index) => (
                                    <div key={bookingRequest.bookingRequestId} style={{ width: '100%' }}>
                                        <BookingRequestCard
                                            bookingRequest={bookingRequest}
                                            isSelected={selectedBookingRequestId === bookingRequest.bookingRequestId}
                                            showDividerAtEnd={index !== filteredBookingRequests.length - 1}
                                            onClick={(): void =>
                                                void router.push(`/chef-profile/bookings/${bookingRequest.bookingRequestId}`, undefined, {
                                                    scroll: false,
                                                })
                                            }
                                        />
                                    </div>
                                ))}
                            </List>
                        </div>

                        <div
                            className={classNames(
                                styles.selectedBookingContainer,
                                Boolean(selectedBookingRequestId) ? '' : styles.hiddenOnMobile,
                            )}
                        >
                            {selectedBookingRequestId && (
                                <BookingRequestDetail
                                    cookId={signedInUser.userId}
                                    cookHasStripePayoutMethodActivated={hasStripePayoutMethodActivated}
                                    bookingRequestId={selectedBookingRequestId}
                                    onBack={(): void => void router.push('/profile/bookings')}
                                />
                            )}

                            {!selectedBookingRequestId && (
                                <>
                                    <Image
                                        src="/logo/people-eat.png"
                                        alt=""
                                        width="1920"
                                        height="1080"
                                        className={styles.noSelectedBookingImage}
                                    />
                                    <span className={styles.noSelectedBookingLabel}>
                                        Wähle eine Buchungsanfrage aus der Seitenleiste aus.
                                    </span>
                                    <span className={styles.noSelectedBookingLabel}>
                                        Oder{' '}
                                        <Link href="/chefs" className="text-orange no-underline">
                                            finde hier einen Koch
                                        </Link>{' '}
                                        für dein nächstes Event.
                                    </span>
                                </>
                            )}
                        </div>
                    </main>
                </div>

                <PEFooter className={styles.hiddenOnMobile} />
            </VStack>
        </>
    );
};

export default Index;
