import { useQuery } from '@apollo/client';
import { Divider, Tab, Tabs } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import { FindOneUserBookingRequestDocument } from '../../../data-source/generated/graphql';
import { BookingRequestDetailEventTab } from '../../bookingRequestSharedTabs/BookingRequestDetailEventTab';
import { BookingRequestDetailMenuTab } from '../../bookingRequestSharedTabs/BookingRequestDetailMenuTab';
import { BookingRequestDetailSupportTab } from '../../bookingRequestSharedTabs/BookingRequestDetailSupportTab';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import HStack from '../../utility/hStack/HStack';
import styles from './BookingRequestDetail.module.css';
import BookingRequestDetailChatTab from './BookingRequestDetailChatTab';
import {
    isUserProfileBookingTabType,
    userProfileBookingTabTranslationKeys,
    userProfileBookingTabTypes,
    type UserProfileBookingTabType,
} from './userProfileBookingTabs';

export interface BookingRequestDetailProps {
    userId: string;
    bookingRequestId: string;
    onBack: () => void;
}

export default function BookingRequestDetail({ userId, bookingRequestId, onBack }: BookingRequestDetailProps): ReactElement {
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');

    const router = useRouter();
    const queryParamTab: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;
    const [tab, setTab] = useState<UserProfileBookingTabType>('CHAT');
    useEffect(() => {
        if (queryParamTab && isUserProfileBookingTabType(queryParamTab)) setTab(queryParamTab);
    }, [queryParamTab]);

    function changeTab(changedTab: UserProfileBookingTabType): void {
        setTab(changedTab);
        void router.replace({ query: { ...router.query, tab: changedTab } });
    }

    const { data, loading, error, refetch } = useQuery(FindOneUserBookingRequestDocument, { variables: { userId, bookingRequestId } });

    if (loading) return <>Loading...</>;

    const bookingRequest = data?.users.bookingRequests.findOne;

    if (error || !bookingRequest) return <>An error has ocurred</>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HStack style={{ alignItems: 'center' }} gap={8}>
                    <PEIconButton icon={Icon.arrowPrev} onClick={onBack} />

                    {bookingRequest.cook.user.profilePictureUrl && (
                        <Image
                            unoptimized
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
                </HStack>

                <Tabs
                    value={tab}
                    onChange={(_, changedTab: UserProfileBookingTabType): void => changeTab(changedTab)}
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    {userProfileBookingTabTypes
                        .filter((type) => (type === 'MENU' ? Boolean(bookingRequest.configuredMenu) : true))
                        .map((tabType) => (
                            <Tab
                                key={tabType}
                                value={tabType}
                                style={{ textTransform: 'none' }}
                                label={translateGlobalBookingRequest(userProfileBookingTabTranslationKeys[tabType])}
                            />
                        ))}
                </Tabs>
            </div>

            <Divider flexItem />

            {tab === 'CHAT' && (
                <BookingRequestDetailChatTab
                    userId={userId}
                    bookingRequest={bookingRequest}
                    onUpdateRequired={(): void => void refetch()}
                />
            )}

            {tab === 'EVENT' && <BookingRequestDetailEventTab bookingRequest={bookingRequest} />}

            {bookingRequest.configuredMenu && tab === 'MENU' && (
                <BookingRequestDetailMenuTab configuredMenu={bookingRequest.configuredMenu} />
            )}

            {tab === 'SUPPORT' && (
                <BookingRequestDetailSupportTab
                    userId={userId}
                    bookingRequestId={bookingRequest.bookingRequestId}
                    afterSubmission={(): void => changeTab('CHAT')}
                />
            )}
        </div>
    );
}
