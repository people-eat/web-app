import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';
import {
    CreateOneUserBookingRequestChatMessageDocument,
    FindOneUserBookingRequestDocument,
    UserBookingRequestAcceptDocument,
    UserBookingRequestDeclineDocument,
    UserBookingRequestUpdatePriceDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEReviewCardUser from '../../../standard/modal/PEReviewCardUser';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ProfilePageBookingsChatMessages from './ProfilePageBookingsChatMessages';
import { userProfileBookingTabTranslationKeys, userProfileBookingTabTypes, type UserProfileBookingTabType } from './userProfileBookingTabs';

export interface ProfilePageBookingMobileProps {
    setIsSelectedOpen: (arg0: boolean) => void;
    userId: string;
    bookingRequestId: string;
}

export default function ProfilePageBookingMobile({
    setIsSelectedOpen,
    userId,
    bookingRequestId,
}: ProfilePageBookingMobileProps): ReactElement {
    const { data, refetch } = useQuery(FindOneUserBookingRequestDocument, {
        variables: { userId, bookingRequestId },
    });
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');
    const bookingRequest = data?.users.bookingRequests.findOne;
    const [tab, setTab] = useState<UserProfileBookingTabType>('CHAT');
    const [newMessage, setNewMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [amount, setAmount] = useState(0);

    const [declineBookingRequest] = useMutation(UserBookingRequestDeclineDocument);
    const [acceptBookingRequest] = useMutation(UserBookingRequestAcceptDocument);
    const [updateBookingRequestPrice] = useMutation(UserBookingRequestUpdatePriceDocument);
    const [createMessage] = useMutation(CreateOneUserBookingRequestChatMessageDocument);

    const handleTabChange = (selectedTab: UserProfileBookingTabType): void => {
        setTab(selectedTab);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        setAmount(bookingRequest?.price.amount ?? 0);
        if (bookingRequest?.status === 'COMPLETED') setTab('RATING');
    }, [bookingRequest]);

    return (
        <div className="fixed inset-0 z-50 mt-[80px] bg-white py-3" style={{ overflowY: 'auto' }}>
            <div className="flex items-center justify-between px-5 py-3 mb-3" style={{ borderBottom: '2px solid #f5f5f5' }}>
                <HStack style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                        className="mt-4 px-4 py-2 text-white bg-transparent border-none rounded"
                        onClick={(): void => setIsSelectedOpen(false)}
                    >
                        <PEIcon icon={Icon.arrowPrev} edgeLength={20} />
                    </button>
                    {bookingRequest?.cook.user.profilePictureUrl && (
                        <Image
                            className="rounded-3"
                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                            src={bookingRequest?.cook.user.profilePictureUrl}
                            alt={'client image'}
                            width={45}
                            height={45}
                        />
                    )}
                    {!bookingRequest?.cook.user.profilePictureUrl && (
                        <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                            <PEIcon icon={Icon.profileLight} edgeLength={32} />
                        </div>
                    )}
                    <span className="ml-2">{bookingRequest?.cook.user.firstName}</span>
                </HStack>
                <div className="relative ml-4">
                    <button
                        className="px-3 py-2 text-base border rounded-md bg-transparent border-none focus:outline-none"
                        onClick={(): void => setIsMenuOpen(!isMenuOpen)}
                    >
                        <PEIcon icon={Icon.file} className="text-orangeActive" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-60 border rounded shadow-md">
                            {userProfileBookingTabTypes.map((tabType) => (
                                <button
                                    key={translateGlobalBookingRequest(tabType)}
                                    className={`w-full bg-white text-lg border-none px-4 py-2 text-left  cursor-pointer hover:text-orangeActive ${
                                        tab === tabType ? 'font-semibold' : ''
                                    }`}
                                    onClick={(): void => handleTabChange(translateGlobalBookingRequest(tabType))}
                                >
                                    {translateGlobalBookingRequest(userProfileBookingTabTranslationKeys[tabType])}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                {tab === 'CHAT' && (
                    <div className="px-4">
                        <ProfilePageBookingsChatMessages userId={userId} bookingRequestId={bookingRequest?.bookingRequestId ?? ''} />

                        {bookingRequest?.status === 'OPEN' && (
                            <HStack gap={16} className="w-full">
                                {bookingRequest.cookAccepted === true && bookingRequest.userAccepted === null && (
                                    <>
                                        <PEButton
                                            onClick={(): void =>
                                                void declineBookingRequest({
                                                    variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                                                }).then((result) => result.data?.users.bookingRequests.success && void refetch())
                                            }
                                            title={translateGlobalBookingRequest('decline')}
                                            size="s"
                                            type="secondary"
                                        />
                                        <PEButton
                                            onClick={(): void =>
                                                void acceptBookingRequest({
                                                    variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                                                }).then((result) => result.data?.users.bookingRequests.success && void refetch())
                                            }
                                            title={translateGlobalBookingRequest('accept')}
                                            size="s"
                                        />
                                    </>
                                )}
                                {bookingRequest?.cookAccepted === null && bookingRequest.userAccepted === true && (
                                    <PEButton
                                        onClick={(): void =>
                                            void declineBookingRequest({
                                                variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                                            }).then((result) => result.data?.users.bookingRequests.success && void refetch())
                                        }
                                        title={translateGlobalBookingRequest('decline')}
                                        size="s"
                                    />
                                )}
                            </HStack>
                        )}

                        {bookingRequest?.status === 'PENDING' && (
                            <PETextField
                                className="w-full"
                                value={newMessage}
                                onChange={setNewMessage}
                                type="text"
                                endContent={
                                    <Button
                                        onClick={(): void =>
                                            void createMessage({
                                                variables: {
                                                    userId,
                                                    bookingRequestId: bookingRequest.bookingRequestId,
                                                    request: { message: newMessage },
                                                },
                                            }).then((result) => {
                                                if (!result.data?.users.bookingRequests.chatMessages.success) return;
                                                void refetch();
                                                setNewMessage('');
                                            })
                                        }
                                    >
                                        {translateGlobalBookingRequest('send')}
                                    </Button>
                                }
                            />
                        )}
                    </div>
                )}

                {tab === 'EVENT_DETAILS' && (
                    <VStack className="w-[80vw]" gap={32}>
                        <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                            <span className="text-text-m-bold">{translateGlobalBookingRequest('participants-label')}</span>
                            <HStack gap={16} className="w-full">
                                <PEIcon icon={Icon.users} /> <span>{translateGlobalBookingRequest('adults-label')}</span> <Spacer />{' '}
                                {bookingRequest?.adultParticipants}
                            </HStack>
                            <HStack gap={16} className="w-full">
                                <PEIcon icon={Icon.users} /> <span>{translateGlobalBookingRequest('children-label')}</span> <Spacer />{' '}
                                {bookingRequest?.children}
                            </HStack>
                        </VStack>
                        <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                            <span className="text-text-m-bold">{translateGlobalBookingRequest('event-details-label')}</span>
                            <HStack gap={16}>
                                <PETextField
                                    value={moment(bookingRequest?.dateTime).format(moment.HTML5_FMT.DATE)}
                                    onChange={(): void => undefined}
                                    type="text"
                                />
                                <PETextField
                                    value={moment(bookingRequest?.dateTime).format('LT')}
                                    onChange={(): void => undefined}
                                    type="text"
                                />
                                <PETextField value={bookingRequest?.occasion} onChange={(): void => undefined} type="text" />
                            </HStack>
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
                        <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                            <span className="text-text-m-bold">{translateGlobalBookingRequest('budget-label')}</span>
                            <PETextField
                                value={`${amount}`}
                                endContent={<>{bookingRequest?.price.currencyCode}</>}
                                onChange={(changedAmount): void => setAmount(Number(changedAmount))}
                                type="text"
                            />
                        </VStack>
                        {bookingRequest?.price.amount !== amount && (
                            <PEButton
                                title={translateGlobalBookingRequest('budget-suggestion')}
                                onClick={(): void =>
                                    void updateBookingRequestPrice({
                                        variables: {
                                            userId,
                                            bookingRequestId: bookingRequest?.bookingRequestId ?? '',
                                            price: { amount, currencyCode: bookingRequest?.price?.currencyCode ?? ('EUR' as CurrencyCode) },
                                        },
                                    }).then((result) => {
                                        if (!result.data?.users.bookingRequests.success) return;
                                        void refetch();
                                    })
                                }
                            />
                        )}
                    </VStack>
                )}

                {tab === 'MENU' && <div></div>}

                {tab === 'RATING' && <PEReviewCardUser />}
            </div>
        </div>
    );
}
