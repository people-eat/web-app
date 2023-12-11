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
import { GlobalBookingRequestCard } from '../../../components/cards/globalBookingRequestCard/GlobalBookingRequestCard';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import { UserProfileNavigationTabs } from '../../../components/navigation/UserProfileNavigationTabs';
import BookingRequestDetail from '../../../components/pages/profile/BookingRequestDetail';
import GlobalBookingRequestDetail from '../../../components/pages/profile/GlobalBookingRequestDetail';
import styles from '../../../components/pages/profile/bookings.module.css';
import VStack from '../../../components/utility/vStack/VStack';
import { createApolloClient } from '../../../data-source/createApolloClient';
import {
    GetSignedInUserDocument,
    GetUserProfileBookingsPageDataDocument,
    type GetSignedInUserQuery,
    type GetUserProfileBookingsPageDataQuery,
} from '../../../data-source/generated/graphql';

interface ServerSideProps {
    signedInUser: NonNullable<GetSignedInUserQuery['users']['signedInUser']>;
    bookingRequests: NonNullable<GetUserProfileBookingsPageDataQuery['users']['bookingRequests']['findMany']>;
    globalBookingRequests: NonNullable<GetUserProfileBookingsPageDataQuery['users']['globalBookingRequests']['findMany']>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) throw new Error();

    const { data: bookingRequestData } = await apolloClient.query({
        query: GetUserProfileBookingsPageDataDocument,
        variables: { userId: signedInUser.userId },
    });

    return {
        props: {
            signedInUser,
            bookingRequests: bookingRequestData.users.bookingRequests.findMany ?? [],
            globalBookingRequests: bookingRequestData.users.globalBookingRequests.findMany ?? [],
        },
    };
};

const Index: NextPage<ServerSideProps> = ({ signedInUser, bookingRequests, globalBookingRequests }) => {
    const router = useRouter();

    const [selectedBookingRequestId] = router.query.slug ?? [];

    let selectedBookingRequestIdType: 'REGULAR' | 'GLOBAL' = 'REGULAR';

    if (
        globalBookingRequests.findIndex(
            (globalBookingRequest) => globalBookingRequest.globalBookingRequestId === selectedBookingRequestId,
        ) !== -1
    )
        selectedBookingRequestIdType = 'GLOBAL';

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
                    <UserProfileNavigationTabs
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
                                {(filterOption === 'ALL' || filterOption === 'OPEN') &&
                                    globalBookingRequests.map((bookingRequest) => (
                                        <div key={bookingRequest.globalBookingRequestId} style={{ width: '100%' }}>
                                            <GlobalBookingRequestCard
                                                globalBookingRequest={bookingRequest}
                                                isSelected={selectedBookingRequestId === bookingRequest.globalBookingRequestId}
                                                onClick={(): void =>
                                                    void router.push(
                                                        `/profile/bookings/${bookingRequest.globalBookingRequestId}`,
                                                        undefined,
                                                        { scroll: false },
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}

                                {filteredBookingRequests.map((bookingRequest, index) => (
                                    <div key={bookingRequest.bookingRequestId} style={{ width: '100%' }}>
                                        <BookingRequestCard
                                            bookingRequest={bookingRequest}
                                            isSelected={selectedBookingRequestId === bookingRequest.bookingRequestId}
                                            showDividerAtEnd={index !== filteredBookingRequests.length - 1}
                                            onClick={(): void =>
                                                void router.push(`/profile/bookings/${bookingRequest.bookingRequestId}`, undefined, {
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
                            {selectedBookingRequestId && selectedBookingRequestIdType === 'REGULAR' && (
                                <BookingRequestDetail
                                    userId={signedInUser.userId}
                                    bookingRequestId={selectedBookingRequestId}
                                    onBack={(): void => void router.push('/profile/bookings')}
                                />
                            )}

                            {selectedBookingRequestId && selectedBookingRequestIdType === 'GLOBAL' && (
                                <GlobalBookingRequestDetail globalBookingRequestId={selectedBookingRequestId} />
                            )}

                            {!selectedBookingRequestId && (
                                <>
                                    <Image
                                        unoptimized
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
