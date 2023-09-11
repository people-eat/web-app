import { useQuery } from '@apollo/client';
import { useState, type ReactElement } from 'react';
import { FindManyUserBookingRequestsDocument } from '../../../data-source/generated/graphql';
import PEMobileChatCard from '../../cards/chatCard/PEMobileChatCard';
import VStack from '../../utility/vStack/VStack';
import ProfilePageBookingMobile from './bookingsTab/ProfilePageBookingMobile';

export interface PEMobileChatProps {
    userId: string;
}

export default function PEMobileChat({ userId }: PEMobileChatProps): ReactElement {
    const [selectedBookingRequestId, setSelectedBookingRequestId] = useState<string | undefined>();
    const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    const bookingRequestsResult = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId: userId ?? '' } });
    const bookingRequests = bookingRequestsResult.data?.users.bookingRequests.findMany ?? [];
    const handleBookingRequestClick = (bookingRequestId: string): void => {
        setSelectedBookingRequestId(bookingRequestId);
    };

    return (
        <VStack style={{ alignItems: 'flex-start' }} className="w-[80%]">
            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                {bookingRequests.map((req) => (
                    <PEMobileChatCard
                        key={req.bookingRequestId}
                        bookingRequest={{
                            bookingRequestId: req.bookingRequestId,
                            price: {
                                amount: req.price.amount,
                                currencyCode: req.price.currencyCode,
                            },
                            status: req.status,
                            dateTime: new Date(req.dateTime),
                            cook: {
                                user: {
                                    firstName: req.cook.user.firstName,
                                    profilePictureUrl: req.cook.user.profilePictureUrl ?? '',
                                },
                            },
                            configuredMenu: {
                                title: req.configuredMenu?.title || undefined,
                            },
                        }}
                        onClick={(): void => {
                            handleBookingRequestClick(req.bookingRequestId);
                            setIsSelectedOpen(true);
                        }}
                    />
                ))}
            </VStack>
            <VStack
                gap={16}
                className="bg-white shadow-primary"
                style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 16, flex: 2, borderRadius: 16 }}
            ></VStack>
            {selectedBookingRequestId && isSelectedOpen && (
                <ProfilePageBookingMobile
                    setIsSelectedOpen={setIsSelectedOpen}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    userId={userId}
                    bookingRequestId={selectedBookingRequestId}
                />
            )}
        </VStack>
    );
}
