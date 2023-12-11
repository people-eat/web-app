import { useQuery } from '@apollo/client';
import { Divider, Tab, Tabs } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import { FindOneCookBookingRequestDocument } from '../../../data-source/generated/graphql';
import { BookingRequestDetailEventTab } from '../../bookingRequestSharedTabs/BookingRequestDetailEventTab';
import { BookingRequestDetailMenuTab } from '../../bookingRequestSharedTabs/BookingRequestDetailMenuTab';
import { BookingRequestDetailSupportTab } from '../../bookingRequestSharedTabs/BookingRequestDetailSupportTab';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import HStack from '../../utility/hStack/HStack';
import styles from './CookBookingRequestDetail.module.css';
import { CookBookingRequestDetailChatTab } from './CookBookingRequestDetailChatTab';
import {
    cookProfileBookingTabTranslationKeys,
    cookProfileBookingTabTypes,
    isCookProfileBookingTabType,
    type CookProfileBookingTabType,
} from './cookProfileBookingTabs';

export interface CookBookingRequestDetailProps {
    cookId: string;
    cookHasStripePayoutMethodActivated: boolean;
    bookingRequestId: string;
    onBack: () => void;
}

export default function CookBookingRequestDetail({
    cookId,
    cookHasStripePayoutMethodActivated,
    bookingRequestId,
    onBack,
}: CookBookingRequestDetailProps): ReactElement {
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');

    const router = useRouter();
    const queryParamTab: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;
    const [tab, setTab] = useState<CookProfileBookingTabType>('CHAT');
    useEffect(() => {
        if (queryParamTab && isCookProfileBookingTabType(queryParamTab)) setTab(queryParamTab);
    }, [queryParamTab]);

    function changeTab(changedTab: CookProfileBookingTabType): void {
        setTab(changedTab);
        void router.replace({ query: { ...router.query, tab: changedTab } });
    }

    const { data, loading, error, refetch } = useQuery(FindOneCookBookingRequestDocument, { variables: { cookId, bookingRequestId } });

    if (loading) return <>Loading...</>;

    const bookingRequest = data?.cooks.bookingRequests.findOne;

    if (error || !bookingRequest) return <>An error has ocurred</>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HStack style={{ alignItems: 'center' }} gap={8}>
                    <PEIconButton icon={Icon.arrowPrev} onClick={onBack} />

                    {bookingRequest.user.profilePictureUrl && (
                        <Image
                            unoptimized
                            className="rounded-3"
                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                            src={bookingRequest.user.profilePictureUrl}
                            alt={'client image'}
                            width={45}
                            height={45}
                        />
                    )}

                    {!bookingRequest.user.profilePictureUrl && (
                        <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                            <PEIcon icon={Icon.profileLight} edgeLength={32} />
                        </div>
                    )}

                    {bookingRequest.user.firstName}
                </HStack>

                <Tabs
                    value={tab}
                    onChange={(_, changedTab: CookProfileBookingTabType): void => changeTab(changedTab)}
                    variant="scrollable"
                    allowScrollButtonsMobile
                >
                    {cookProfileBookingTabTypes
                        .filter((type) => (type === 'MENU' ? Boolean(bookingRequest.configuredMenu) : true))
                        .map((tabType) => (
                            <Tab
                                key={tabType}
                                value={tabType}
                                style={{ textTransform: 'none' }}
                                label={translateGlobalBookingRequest(cookProfileBookingTabTranslationKeys[tabType])}
                            />
                        ))}
                </Tabs>
            </div>

            <Divider flexItem />

            {tab === 'CHAT' && (
                <CookBookingRequestDetailChatTab
                    cookId={cookId}
                    cookHasStripePayoutMethodActivated={cookHasStripePayoutMethodActivated}
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
                    userId={cookId}
                    bookingRequestId={bookingRequest.bookingRequestId}
                    afterSubmission={(): void => changeTab('SUPPORT')}
                />
            )}
        </div>
    );
}
