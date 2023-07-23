import { useMutation, useQuery } from '@apollo/client';
import { Button, Divider, Tab, Tabs } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';
import {
    CookBookingRequestAcceptDocument,
    CookBookingRequestDeclineDocument,
    CookBookingRequestUpdatePriceDocument,
    CreateOneCookBookingRequestChatMessageDocument,
    FindOneCookBookingRequestDocument,
} from '../../../../data-source/generated/graphql';
import PEMealCard from '../../../cards/mealCard/PEMealCard';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import CookProfilePageBookingsChatMessages from './CookProfilePageBookingsChatMessages';

export interface CookProfilePageBookingsTabProps {
    cookId: string;
    bookingRequestId: string;
    onClose: () => void;
}

export default function CookProfilePageBookingsTabDetail({
    cookId,
    bookingRequestId,
    onClose,
}: CookProfilePageBookingsTabProps): ReactElement {
    const { data, refetch } = useQuery(FindOneCookBookingRequestDocument, { variables: { cookId, bookingRequestId } });

    const { t: translateBooking } = useTranslation('global-booking-request');
    const { t: commonTranslate } = useTranslation('common');

    const tabToTranslations: Record<'CHAT' | 'EVENT_DETAILS' | 'MENU' | 'RATING', string> = {
        ['CHAT']: translateBooking('tab-chat'),
        ['EVENT_DETAILS']: translateBooking('tab-details'),
        ['MENU']: translateBooking('tab-menu'),
        ['RATING']: translateBooking('tab-rating'),
    };

    const [tab, setTab] = useState<'CHAT' | 'EVENT_DETAILS' | 'MENU' | 'RATING'>('CHAT');
    const [newMessage, setNewMessage] = useState('');
    const [amount, setAmount] = useState(0);

    const [acceptBookingRequest] = useMutation(CookBookingRequestAcceptDocument);
    const [declineBookingRequest] = useMutation(CookBookingRequestDeclineDocument);
    const [updateBookingRequestPrice] = useMutation(CookBookingRequestUpdatePriceDocument);
    const [createMessage] = useMutation(CreateOneCookBookingRequestChatMessageDocument);

    const bookingRequest = data?.cooks.bookingRequests.findOne;

    useEffect(() => {
        setAmount(bookingRequest?.price.amount ?? 0);
        if (bookingRequest?.status === 'COMPLETED') setTab('RATING');
    }, [bookingRequest]);

    if (!bookingRequest) return <>{commonTranslate('loading')}</>;

    return (
        <>
            <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                <Tabs value={tab}>
                    <Tab
                        value={tabToTranslations['CHAT']}
                        onClick={(): void => setTab('CHAT')}
                        style={{ textTransform: 'none' }}
                        label="Chat"
                    />
                    <Tab
                        value={tabToTranslations['EVENT_DETAILS']}
                        onClick={(): void => setTab('EVENT_DETAILS')}
                        style={{ textTransform: 'none' }}
                        label="Event Details"
                    />
                    <Tab
                        value={tabToTranslations['MENU']}
                        onClick={(): void => setTab('MENU')}
                        style={{ textTransform: 'none' }}
                        label="Menu"
                    />
                    <Tab
                        value={tabToTranslations['RATING']}
                        onClick={(): void => setTab('RATING')}
                        style={{ textTransform: 'none' }}
                        label="Rating"
                    />
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

            <Spacer />

            {tab === 'CHAT' && (
                <>
                    <CookProfilePageBookingsChatMessages cookId={cookId} bookingRequestId={bookingRequest.bookingRequestId} />

                    {bookingRequest.status === 'OPEN' && (
                        <HStack gap={16} className="w-full">
                            {bookingRequest.cookAccepted === null && bookingRequest.userAccepted === true && (
                                <>
                                    <PEButton
                                        onClick={(): void =>
                                            void declineBookingRequest({
                                                variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                                            }).then((result) => result.data?.cooks.bookingRequests.success && void refetch())
                                        }
                                        title="Decline"
                                        size="s"
                                        type="secondary"
                                    />
                                    <PEButton
                                        onClick={(): void =>
                                            void acceptBookingRequest({
                                                variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                                            }).then((result) => result.data?.cooks.bookingRequests.success && void refetch())
                                        }
                                        title="Accept"
                                        size="s"
                                    />
                                </>
                            )}
                            {bookingRequest.cookAccepted === true && bookingRequest.userAccepted === null && (
                                <PEButton
                                    onClick={(): void =>
                                        void declineBookingRequest({
                                            variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                                        }).then((result) => result.data?.cooks.bookingRequests.success && void refetch())
                                    }
                                    title="Decline"
                                    size="s"
                                />
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
                                    onClick={(): void =>
                                        void createMessage({
                                            variables: {
                                                cookId,
                                                bookingRequestId: bookingRequest.bookingRequestId,
                                                request: { message: newMessage },
                                            },
                                        }).then((result) => {
                                            if (!result.data?.cooks.bookingRequests.chatMessages.success) return;
                                            void refetch();
                                            setNewMessage('');
                                        })
                                    }
                                >
                                    Send
                                </Button>
                            }
                        />
                    )}
                </>
            )}

            {bookingRequest.configuredMenu && tab === 'MENU' && (
                <VStack>
                    <span className="text-heading-m">{bookingRequest.configuredMenu.title}</span>
                    <VStack gap={32} style={{ flex: 1 }}>
                        {bookingRequest.configuredMenu.courses.map((course) => (
                            <VStack gap={16} key={course.index} className="w-full">
                                <span className="text-heading-s">{course.title}</span>

                                <PEMealCard
                                    title={course.mealTitle}
                                    description={course.mealDescription}
                                    imageUrl={course.mealImageUrl ?? undefined}
                                />
                            </VStack>
                        ))}
                    </VStack>
                </VStack>
            )}

            {tab === 'EVENT_DETAILS' && (
                <VStack className="box-border p-4 md:p-0" gap={32}>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('participants-label')}</span>
                        <HStack gap={16} className="w-full">
                            <PEIcon icon={Icon.users} /> <span>{translateBooking('adults-label')}</span> <Spacer />{' '}
                            {bookingRequest.adultParticipants}
                        </HStack>
                        <HStack gap={16} className="w-full">
                            <PEIcon icon={Icon.users} /> <span>{translateBooking('children-label')}</span> <Spacer />{' '}
                            {bookingRequest.children}
                        </HStack>
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('event-details-label')}</span>
                        <HStack gap={16}>
                            <PETextField
                                value={moment(bookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                                onChange={(): void => undefined}
                                type="text"
                            />
                            <PETextField
                                value={moment(bookingRequest.dateTime).format('LT')}
                                onChange={(): void => undefined}
                                type="text"
                            />
                            <PETextField value={bookingRequest.occasion} onChange={(): void => undefined} type="text" />
                        </HStack>
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('categories-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('kitchen-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('allergies-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('budget-label')}</span>
                        <PETextField
                            value={`${amount}`}
                            endContent={<>{bookingRequest.price.currencyCode}</>}
                            onChange={(changedAmount): void => setAmount(Number(changedAmount))}
                            type="text"
                        />
                    </VStack>
                    {bookingRequest.price.amount !== amount && (
                        <PEButton
                            title={translateBooking('budget-suggestion')}
                            onClick={(): void =>
                                void updateBookingRequestPrice({
                                    variables: {
                                        cookId,
                                        bookingRequestId: bookingRequest.bookingRequestId,
                                        price: { amount, currencyCode: bookingRequest.price.currencyCode },
                                    },
                                }).then((result) => {
                                    if (!result.data?.cooks.bookingRequests.success) return;
                                    void refetch();
                                })
                            }
                        />
                    )}
                </VStack>
            )}
        </>
    );
}
