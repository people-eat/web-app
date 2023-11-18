import { Divider, List, ListItemButton } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import BookingListHeader, { type BookingListHeaderFilterOption } from '../../../components/new-user-profile-booking-tab/BookingListHeader';
import BookingRequestDetail from '../../../components/new-user-profile-booking-tab/BookingRequestDetail';
import GlobalBookingRequestDetail from '../../../components/new-user-profile-booking-tab/GlobalBookingRequestDetail';
import styles from '../../../components/new-user-profile-booking-tab/bookings.module.css';
import BookingRequestStatusPill from '../../../components/standard/bookingRequestStatusPill/BookingRequestStatusPill';
import { Icon } from '../../../components/standard/icon/Icon';
import PEIcon from '../../../components/standard/icon/PEIcon';
import PETabItem from '../../../components/standard/tabItem/PETabItem';
import HStack from '../../../components/utility/hStack/HStack';
import Spacer from '../../../components/utility/spacer/Spacer';
import VStack from '../../../components/utility/vStack/VStack';
import { createApolloClient } from '../../../data-source/createApolloClient';
import {
    GetSignedInUserDocument,
    GetUserProfileBookingsPageDataDocument,
    type GetUserProfileBookingsPageDataQuery,
} from '../../../data-source/generated/graphql';
import { formatPrice } from '../../../shared-domain/formatPrice';
import { userProfileTabs } from '../shared';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) return { props: {} };

    const { data: bookingRequestData } = await apolloClient.query({
        query: GetUserProfileBookingsPageDataDocument,
        variables: { userId: signedInUser.userId },
    });

    return {
        props: {
            signedInUser,
            bookingRequests: bookingRequestData.users.bookingRequests.findMany,
            globalBookingRequests: bookingRequestData.users.globalBookingRequests.findMany,
        },
    };
};

interface UserProfileBookingsPageProps {
    signedInUser: NonNullable<GetUserProfileBookingsPageDataQuery['users']['signedInUser']>;
    bookingRequests: NonNullable<GetUserProfileBookingsPageDataQuery['users']['bookingRequests']['findMany']>;
    globalBookingRequests: NonNullable<GetUserProfileBookingsPageDataQuery['users']['globalBookingRequests']['findMany']>;
}

const Index: NextPage<UserProfileBookingsPageProps> = ({ signedInUser, bookingRequests, globalBookingRequests }) => {
    const { t: translateCommon } = useTranslation('common');
    const { t } = useTranslation('global-booking-request');
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
                    <div className={classNames(styles.tabSelector, Boolean(selectedBookingRequestId) ? styles.hiddenOnMobile : '')}>
                        {userProfileTabs.map(({ type, translationKey, path }) => (
                            <PETabItem
                                key={type}
                                active={type === 'BOOKINGS'}
                                title={translateCommon(translationKey)}
                                onClick={(): void => void router.push(path)}
                            />
                        ))}
                    </div>

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
                                            <ListItemButton
                                                selected={selectedBookingRequestId === bookingRequest.globalBookingRequestId}
                                                onClick={(): void =>
                                                    void router.push(
                                                        `/profile/bookings/${bookingRequest.globalBookingRequestId}`,
                                                        undefined,
                                                        { scroll: false },
                                                    )
                                                }
                                            >
                                                <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                                                    <HStack className="w-full">
                                                        <BookingRequestStatusPill status="OPEN" />

                                                        <Spacer />

                                                        <span className="text-green">{bookingRequest.priceClass.type}</span>
                                                    </HStack>

                                                    <span className="text-heading-ss-bold md:text-text-sm-bold">
                                                        {bookingRequest.occasion}
                                                    </span>

                                                    <HStack gap={16} className="text-gray">
                                                        {moment(bookingRequest.dateTime).format('L')}
                                                        <Divider orientation="vertical" flexItem style={{ display: 'inline' }}></Divider>
                                                        {moment(bookingRequest.dateTime).format('LT')}
                                                    </HStack>

                                                    <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                                                        <span>Globale Anfrage</span>
                                                        <Spacer />
                                                        in {moment(bookingRequest.dateTime).diff(moment(), 'days')} {t('days')}
                                                    </HStack>
                                                </VStack>
                                            </ListItemButton>

                                            <Divider />
                                        </div>
                                    ))}

                                {filteredBookingRequests.map((bookingRequest, index) => (
                                    <div key={bookingRequest.bookingRequestId} style={{ width: '100%' }}>
                                        <ListItemButton
                                            selected={selectedBookingRequestId === bookingRequest.bookingRequestId}
                                            onClick={(): void =>
                                                void router.push(`/profile/bookings/${bookingRequest.bookingRequestId}`, undefined, {
                                                    scroll: false,
                                                })
                                            }
                                        >
                                            <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                                                <HStack className="w-full">
                                                    <BookingRequestStatusPill status={bookingRequest.status} />

                                                    <Spacer />

                                                    <span className="text-green">{formatPrice(bookingRequest.price)}</span>
                                                </HStack>

                                                <span className="text-heading-ss-bold md:text-text-sm-bold">{bookingRequest.occasion}</span>

                                                <HStack gap={16} className="text-gray">
                                                    {moment(bookingRequest.dateTime).format('L')}
                                                    <Divider orientation="vertical" flexItem style={{ display: 'inline' }}></Divider>
                                                    {moment(bookingRequest.dateTime).format('LT')}
                                                </HStack>

                                                <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                                                    {bookingRequest.cook.user.profilePictureUrl && (
                                                        <Image
                                                            className="rounded-3"
                                                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                                            src={bookingRequest.cook.user.profilePictureUrl}
                                                            alt={'client image'}
                                                            width={45}
                                                            height={45}
                                                        />
                                                    )}
                                                    {!bookingRequest.cook.user.profilePictureUrl && (
                                                        <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                                                            <PEIcon icon={Icon.profileLight} edgeLength={32} />
                                                        </div>
                                                    )}
                                                    {bookingRequest.cook.user.firstName}
                                                    <Spacer />
                                                    in {moment(bookingRequest.dateTime).diff(moment(), 'days')} {t('days')}
                                                </HStack>
                                            </VStack>
                                        </ListItemButton>

                                        {index !== filteredBookingRequests.length - 1 && <Divider />}
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
                                        src="/people-eat.png"
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

                <PEFooter className={Boolean(selectedBookingRequestId) ? styles.hiddenOnMobile : ''} />
            </VStack>
        </>
    );
};

export default Index;
