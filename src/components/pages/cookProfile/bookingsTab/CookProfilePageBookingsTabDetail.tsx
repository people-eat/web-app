import { useMutation, useQuery } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Tab, Tabs } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';
import {
    CookBookingRequestAcceptDocument,
    CookBookingRequestDeclineDocument,
    CreateOneCookBookingRequestChatMessageDocument,
    FindOneCookBookingRequestDocument,
} from '../../../../data-source/generated/graphql';
import { BookingRequestAcceptDialog } from '../../../bookingRequestAcceptDialog/BookingRequestAcceptDialog';
import { BookingRequestDeclineDialog } from '../../../bookingRequestDeclineDialog/BookingRequestDeclineDialog';
import PEMealCardDesktop from '../../../cards/mealCard/PEMealCardDesktop';
import { LoadingDialog } from '../../../loadingDialog/LoadingDialog';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import {
    cookProfileBookingTabTranslationKeys,
    cookProfileBookingTabTypes,
    type CookProfileBookingTabType,
} from '../cookProfileBookingTabs';
import CookProfilePageBookingsChatMessages from './CookProfilePageBookingsChatMessages';

export interface CookProfilePageBookingsTabProps {
    cookId: string;
    bookingRequestId: string;
    onClose: () => void;
}

// eslint-disable-next-line max-statements
export default function CookProfilePageBookingsTabDetail({
    cookId,
    bookingRequestId,
    onClose,
}: CookProfilePageBookingsTabProps): ReactElement {
    const { data, refetch } = useQuery(FindOneCookBookingRequestDocument, { variables: { cookId, bookingRequestId } });

    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');
    const { t: commonTranslate } = useTranslation('common');
    const { t: cookProfileTranslate } = useTranslation('chef-profile');

    const [tab, setTab] = useState<CookProfileBookingTabType>('CHAT');
    const [newMessage, setNewMessage] = useState('');

    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [showCompleteStripeOnboardingDialog, setShowCompleteStripeOnboardingDialog] = useState(false);

    const [acceptBookingRequest, { loading: acceptLoading }] = useMutation(CookBookingRequestAcceptDocument);
    const [declineBookingRequest, { loading: declineLoading }] = useMutation(CookBookingRequestDeclineDocument);
    const [createMessage, { loading: createMessageLoading }] = useMutation(CreateOneCookBookingRequestChatMessageDocument);

    const bookingRequest = data?.cooks.bookingRequests.findOne;
    const hasStripePayoutMethodActivated = data?.cooks.findOne?.hasStripePayoutMethodActivated;

    useEffect(() => {
        if (bookingRequest?.status === 'COMPLETED') setTab('RATING');
    }, [bookingRequest]);

    if (!bookingRequest) return <>{commonTranslate('loading')}</>;

    return (
        <>
            <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                <Tabs value={tab}>
                    {cookProfileBookingTabTypes.map((tabType) => (
                        <Tab
                            key={tabType}
                            value={tabType}
                            onClick={(): void => setTab(tabType)}
                            style={{ textTransform: 'none' }}
                            label={translateGlobalBookingRequest(cookProfileBookingTabTranslationKeys[tabType])}
                        />
                    ))}
                </Tabs>

                <Spacer />

                {bookingRequest.user.firstName}

                {bookingRequest.user.profilePictureUrl && (
                    <Image
                        className="rounded-3"
                        style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        src={bookingRequest.user?.profilePictureUrl}
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

                <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onClose} iconSize={24} />
            </HStack>

            <Divider flexItem />

            {tab === 'CHAT' && (
                <VStack style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
                    <CookProfilePageBookingsChatMessages cookId={cookId} bookingRequestId={bookingRequest.bookingRequestId} />

                    {bookingRequest.status === 'OPEN' && (
                        <HStack gap={16} className="w-full">
                            {bookingRequest.cookAccepted === null && bookingRequest.userAccepted === true && (
                                <>
                                    <PEButton onClick={(): void => setShowDeclineDialog(true)} title="Ablehnen" size="s" type="secondary" />
                                    <PEButton
                                        onClick={(): void => {
                                            if (hasStripePayoutMethodActivated) setShowAcceptDialog(true);
                                            else setShowCompleteStripeOnboardingDialog(true);
                                        }}
                                        title="Akzeptieren"
                                        size="s"
                                    />
                                </>
                            )}
                            {bookingRequest.cookAccepted === true && bookingRequest.userAccepted === null && (
                                <PEButton onClick={(): void => setShowDeclineDialog(true)} title="Ablehnen" size="s" />
                            )}
                        </HStack>
                    )}

                    {bookingRequest.status === 'PENDING' && (
                        <PETextField
                            value={newMessage}
                            onChange={setNewMessage}
                            type="text"
                            endContent={
                                <Button
                                    disabled={createMessageLoading}
                                    onClick={(): void =>
                                        void createMessage({
                                            variables: {
                                                cookId,
                                                bookingRequestId: bookingRequest.bookingRequestId,
                                                request: { message: newMessage },
                                            },
                                        }).then((result) => {
                                            if (!result.data?.cooks.bookingRequests.chatMessages.success) return;
                                            setNewMessage('');
                                        })
                                    }
                                >
                                    {cookProfileTranslate('booking-chat-send')}
                                </Button>
                            }
                        />
                    )}
                </VStack>
            )}

            {bookingRequest.configuredMenu && tab === 'MENU' && (
                <VStack gap={32}>
                    <span className="text-heading-m">{bookingRequest.configuredMenu.title}</span>
                    <VStack gap={32} style={{ flex: 1, alignItems: 'flex-start' }}>
                        {bookingRequest.configuredMenu.courses.map((course) => (
                            <VStack gap={16} key={course.index} className="w-full" style={{ alignItems: 'flex-start' }}>
                                <span className="text-heading-s">{course.title}</span>

                                <PEMealCardDesktop
                                    title={course.mealTitle}
                                    description={course.mealDescription}
                                    imageUrl={course.mealImageUrl ?? undefined}
                                    displayOnly
                                />
                            </VStack>
                        ))}
                    </VStack>
                </VStack>
            )}

            {tab === 'EVENT' && (
                <VStack className="box-border p-4 md:p-0" gap={32} style={{ maxHeight: 675, overflowY: 'auto' }}>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateGlobalBookingRequest('participants-label')}</span>
                        <HStack gap={16} className="w-full">
                            <PEIcon icon={Icon.users} /> <span>{translateGlobalBookingRequest('adults-label')}</span> <Spacer />{' '}
                            {bookingRequest.adultParticipants}
                        </HStack>
                        <HStack gap={16} className="w-full">
                            <PEIcon icon={Icon.users} /> <span>{translateGlobalBookingRequest('children-label')}</span> <Spacer />{' '}
                            {bookingRequest.children}
                        </HStack>
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateGlobalBookingRequest('event-details-label')}</span>
                        <HStack gap={16}>
                            <PETextField value={moment(bookingRequest.dateTime).format('L')} onChange={(): void => undefined} type="text" />
                            <PETextField
                                value={moment(bookingRequest.dateTime).format('LT')}
                                onChange={(): void => undefined}
                                type="text"
                            />
                            <PETextField value={bookingRequest.occasion} onChange={(): void => undefined} type="text" />
                        </HStack>
                        <PETextField value={bookingRequest.location.text} onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateGlobalBookingRequest('categories-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateGlobalBookingRequest('kitchen-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateGlobalBookingRequest('allergies-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                </VStack>
            )}

            <LoadingDialog title={cookProfileTranslate('booking-loading-title-accept')} isLoading={acceptLoading} />

            <LoadingDialog title={cookProfileTranslate('booking-loading-title-decline')} isLoading={declineLoading} />

            <BookingRequestDeclineDialog
                isOpen={showDeclineDialog}
                onCancel={(): void => setShowDeclineDialog(false)}
                onDecline={(): void =>
                    void declineBookingRequest({
                        variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                    }).then((result) => {
                        setShowDeclineDialog(false);
                        if (result.data?.cooks.bookingRequests.success) void refetch();
                    })
                }
            />

            <BookingRequestAcceptDialog
                isOpen={showAcceptDialog}
                onCancel={(): void => setShowAcceptDialog(false)}
                onAccept={(): void =>
                    void acceptBookingRequest({
                        variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                    }).then((result) => {
                        setShowAcceptDialog(false);
                        if (result.data?.cooks.bookingRequests.success) void refetch();
                    })
                }
            />

            <Dialog open={showCompleteStripeOnboardingDialog} onClose={(): void => setShowCompleteStripeOnboardingDialog(false)}>
                <DialogTitle>Wallet hinzufügen um fortzufahren</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Um Buchungsanfragen zukünftig akzeptieren zu können, schließe die Einrichtung deines Kontos bitte ab.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Abbrechen</Button>
                    <Button variant="contained" autoFocus>
                        Wallet hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
